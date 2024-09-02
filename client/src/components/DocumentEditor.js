import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { io } from 'socket.io-client';
import { Typography, Avatar, Box, Container, Button, TextField, Paper } from '@mui/material';
import Navbar from './NavBar';
import { useSelector } from 'react-redux';

const socket = io(process.env.REACT_APP_BASE_URL);

const DocumentEditor = () => {
  const user = useSelector((state) => state.auth.user);
  const [editorContent, setEditorContent] = useState('');
  const [users, setUsers] = useState([]);
  const [suggestionPrompt, setSuggestionPrompt] = useState('');
  const [suggestionResponse, setSuggestionResponse] = useState('');

  useEffect(() => {
    const documentId = 'shared-doc-id';
    const userName = user.name;

    console.log(`User ${userName} is joining document ${documentId}`);
    socket.emit('joinDocument', { documentId, userName });

    socket.on('documentData', (data) => {
      if (data && data.content) {
        console.log(`Received document data for document ${documentId}:`, data.content);
        setEditorContent(data.content || '');
      }
      setUsers(data.users || []);
      console.log(`Current users in document ${documentId}:`, data.users || []);
    });

    socket.on('updateDocument', (newContent) => {
      console.log(`Received updated document content for document ${documentId}:`, newContent);
      setEditorContent(newContent);
    });

    socket.on('userPresence', (users) => {
      setUsers(users);
      console.log(`Updated list of users present in document ${documentId}:`, users);
    });

    return () => {
      console.log(`User ${userName} is leaving document ${documentId}`);
      socket.emit('leaveDocument', { documentId });
    };
  }, [user.name]);

  const handleChange = (content) => {
    console.log(`User ${user.name} is editing the document. New content:`, content);
    setEditorContent(content);
    socket.emit('editDocument', { content });
  };

  const handlePromptSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/ai/suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: suggestionPrompt }),
      });
      const data = await response.json();
      setSuggestionResponse(data.suggestions || '');
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleAcceptSuggestion = () => {
    const updatedContent = `${editorContent}\n${suggestionResponse}`;
    setEditorContent(updatedContent);
    socket.emit('editDocument', { content: updatedContent });
    setSuggestionResponse('');
    setSuggestionPrompt('');
  };

  const handleDeclineSuggestion = () => {
    setSuggestionResponse('');
    setSuggestionPrompt('');
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ p: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Collaborators:</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {users.map((user) => (
                <Avatar
                  key={user.id}
                  alt={user.name}
                  src={user.avatarUrl}
                  title={user.name}
                />
              ))}
            </Box>
          </Box>
          <ReactQuill
            value={editorContent}
            onChange={handleChange}
            placeholder="Enter some text..."
          />
          <Box sx={{ mt: 4 }}>
            <TextField
              label="Enter your prompt"
              fullWidth
              multiline
              rows={2}
              value={suggestionPrompt}
              onChange={(e) => setSuggestionPrompt(e.target.value)}
            />
            <br />
            <Button variant="contained" color="primary" onClick={handlePromptSubmit}>
              Get Suggestions
            </Button>
          </Box>
          {suggestionResponse && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Suggestion:</Typography>
              <Paper sx={{ padding: 2, mb: 2 }}>
                <div dangerouslySetInnerHTML={{ __html: suggestionResponse }} />
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleAcceptSuggestion}
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeclineSuggestion}
                >
                  Decline
                </Button>
              </Paper>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default DocumentEditor;
