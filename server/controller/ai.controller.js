const aiService = require('../services/ai.service');

exports.getSuggestions = async (req, res) => {
  const { text } = req.body;
  try {
    const suggestions = await aiService.getSuggestions(text);
    res.json({ suggestions });
  } catch (error) {
    console.error('Error fetching AI suggestions:', error);
    res.status(500).json({ message: 'Error fetching AI suggestions' });
  }
};
