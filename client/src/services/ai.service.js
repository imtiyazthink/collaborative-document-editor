import axios from 'axios';

const AI_API_URL = `${process.env.REACT_APP_BASE_URL}/api/ai/suggestions`;

export const getSuggestions = async (text) => {
  try {
    const response = await axios.post(AI_API_URL, { text });
    return response.data.suggestions;
  } catch (error) {
    console.error('Error fetching AI suggestions:', error);
    throw error;
  }
};
