const Document = require('../models/Document');
const Version = require('../models/Version');

let io;
let documents = {};
let saveTimers = {}; // To track debounce timers for each document

exports.initialize = (socketIo) => {
  io = socketIo;

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinDocument', async ({ documentId, userName }) => {
      console.log(`User ${socket.id} is joining document: ${documentId}`);

      socket.join(documentId);

      if (!documents[documentId]) {
        // Fetch the document from MongoDB
        const documentData = await Document.findById(documentId).populate('versions');
        if (documentData) {
          console.log(`Fetched document ${documentId} from database.`);
          documents[documentId] = {
            content: documentData.content,
            users: [],
            versions: documentData.versions,
          };
        } else {
          console.log(`Document ${documentId} not found. Creating a new document.`);
          documents[documentId] = {
            content: '<p>Start editing...</p>', // Default content for HTML
            users: [],
            versions: [],
          };
          await Document.create({ _id: documentId, content: documents[documentId].content });
        }
      }

      const document = documents[documentId];
      document.users.push({ id: socket.id, name: userName });

      console.log(`User ${userName} (${socket.id}) added to document ${documentId}. Current users: `, document.users);

      io.to(documentId).emit('documentData', document);

      socket.on('editDocument', async ({ content }) => {
        if (!content) {
          console.log('Received empty content for document update.');
          return;
        }
        console.log(`User ${userName} (${socket.id}) is editing document ${documentId}`);

        documents[documentId].content = content;

        // Save the version in MongoDB
        if (saveTimers[documentId]) {
          clearTimeout(saveTimers[documentId]);
        }

        saveTimers[documentId] = setTimeout(async () => {
          console.log(`Saving version of document ${documentId} edited by user ${userName}`);
          const version = await Version.create({ document: documentId, content, user: userName });
          documents[documentId].versions.push(version);
        }, 2000);

        socket.broadcast.to(documentId).emit('updateDocument', content);
        console.log(`Broadcasted updated content to other users in document ${documentId}`);
      });



      socket.on('cursorPosition', (position) => {
        socket.broadcast.to(documentId).emit('cursorPosition', {
          userId: socket.id,
          position,
        });
        console.log(`User ${socket.id} moved cursor to position: `, position);
      });

      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        documents[documentId].users = documents[documentId].users.filter(user => user.id !== socket.id);
        io.to(documentId).emit('userPresence', documents[documentId].users);
        console.log(`Updated user list for document ${documentId}: `, documents[documentId].users);
      });
    });
  });
};
