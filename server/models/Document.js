const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  _id: String,
  content: {
    type: String,
    required: true,
  },
  versions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Version' }],
});

module.exports = mongoose.model('Document', DocumentSchema);
