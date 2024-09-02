const connectDB = require('./db.config');
const { jwtSecret, mongoURI, port } = require('./app.config');

module.exports = {
  connectDB,
  jwtSecret,
  mongoURI,
  port
}