const mongoose = require("mongoose");

const Material = new mongoose.Schema({
  faculty: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['material', 'question-paper', 'notes', 'assignment'],
    default: 'material',
  }
}, { timestamps: true });

module.exports = mongoose.model("Material", Material);
