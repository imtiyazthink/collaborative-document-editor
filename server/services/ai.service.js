const axios = require('axios');
const { openAiApiKey } = require('../config');

exports.getSuggestions = async (text) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      "model": "gpt-3.5-turbo-instruct",
      prompt: `${text}`,
      max_tokens: 150,
    }, {
      headers: {
        'Authorization': `Bearer ${openAiApiKey}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log("error: ", error)
    throw new Error('Error fetching AI suggestions');
  }
};
