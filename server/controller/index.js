const { loginUser, registerUser } = require('./auth.controller');
const { getSuggestions } = require('./ai.controller');

module.exports = {
  registerUser,
  loginUser,
  getSuggestions
};