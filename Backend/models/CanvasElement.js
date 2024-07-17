// models/CanvasElement.js
const mongoose = require("mongoose");

const CanvasElementSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  shapeType: {
    type: String,
  },
  fill: {
    type: String,
  },
  left: {
    type: Number,
    required: true,
  },
  top: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
  },
  fontSize: {
    type: Number,
  },
});

module.exports = mongoose.model("CanvasElement", CanvasElementSchema);
