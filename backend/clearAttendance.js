require("dotenv").config();
const mongoose = require("mongoose");
const Attendance = require("./models/Other/attendance.model");

const MONGODB_URI = process.env.MONGODB_URI;

async function clearAttendance() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const result = await Attendance.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} attendance records`);

    await mongoose.connection.close();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error clearing attendance:", error);
    process.exit(1);
  }
}

clearAttendance();
