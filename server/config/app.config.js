require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET || 'secret',
    port: process.env.PORT || 5000,
    openAiApiKey: process.env.OPENAI_API_KEY,
};
