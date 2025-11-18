const mongoose = require("mongoose");

const Attendance = new mongoose.Schema({
  enrollmentNo: {
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  totalLectures: {
    type: Number,
    default: 0,
  },
  lecturesAttended: {
    type: Number,
    default: 0,
  },
  percentage: {
    type: Number,
    default: 0,
  },
  records: [{
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Late'],
      required: true,
    }
  }]
}, { timestamps: true });

// Calculate percentage before saving
Attendance.pre('save', function(next) {
  if (this.totalLectures > 0) {
    this.percentage = ((this.lecturesAttended / this.totalLectures) * 100).toFixed(2);
  } else {
    this.percentage = 0;
  }
  next();
});

module.exports = mongoose.model("Attendance", Attendance);
