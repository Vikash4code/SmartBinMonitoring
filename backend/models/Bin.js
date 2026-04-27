const mongoose = require("mongoose");

const binSchema = new mongoose.Schema({
  binId: {
    type: Number,
    required: true,
  },
  fillLevel: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bin", binSchema);