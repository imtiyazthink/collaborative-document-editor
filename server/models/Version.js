const mongoose = require('mongoose');

const VersionSchema = new mongoose.Schema({
  document: { type: String, ref: 'Document', required: true },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Version', VersionSchema);
