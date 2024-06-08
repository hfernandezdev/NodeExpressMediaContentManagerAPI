const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  allowed_content: {
    images: {
      type: Boolean,
      default: false
    },
    videos: {
      type: Boolean,
      default: false
    },
    texts: {
      type: Boolean,
      default: false
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Theme', themeSchema);
