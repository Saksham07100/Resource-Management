const mongoose = require("mongoose");

const Marks = new mongoose.Schema({
  enrollmentNo: {
    type: Number,
    required: true,
  },
  Quiz1: {
    type: {},
  },
  Quiz2: {
    type: {},
  },
  midSem:{
    type:{},
  },
  endSem:{
    type:{},
  },
}, { timestamps: true });

module.exports = mongoose.model("Mark", Marks);
