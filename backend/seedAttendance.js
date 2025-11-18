require("dotenv").config();
const mongoose = require("mongoose");
const Attendance = require("./models/Other/attendance.model");

const MONGODB_URI = process.env.MONGODB_URI;

// Sample attendance data for different subjects
const demoAttendance = [
  // Computer Science Engineering - Year 2, Semester 3
  // Data Structures - Student 101
  {
    enrollmentNo: 101,
    subject: "Data Structures",
    year: 2,
    semester: 3,
    branch: "Computer Science Engineering",
    totalLectures: 45,
    lecturesAttended: 42,
    records: generateAttendanceRecords(45, 42, new Date('2024-08-01'))
  },
  {
    enrollmentNo: 102,
    subject: "Data Structures",
    year: 2,
    semester: 3,
    branch: "Computer Science Engineering",
    totalLectures: 45,
    lecturesAttended: 38,
    records: generateAttendanceRecords(45, 38, new Date('2024-08-01'))
  },
  {
    enrollmentNo: 103,
    subject: "Data Structures",
    year: 2,
    semester: 3,
    branch: "Computer Science Engineering",
    totalLectures: 45,
    lecturesAttended: 40,
    records: generateAttendanceRecords(45, 40, new Date('2024-08-01'))
  },
  
  // Operating Systems
  {
    enrollmentNo: 101,
    subject: "Operating Systems",
    year: 2,
    semester: 3,
    branch: "Computer Science Engineering",
    totalLectures: 42,
    lecturesAttended: 39,
    records: generateAttendanceRecords(42, 39, new Date('2024-08-01'))
  },
  {
    enrollmentNo: 102,
    subject: "Operating Systems",
    year: 2,
    semester: 3,
    branch: "Computer Science Engineering",
    totalLectures: 42,
    lecturesAttended: 35,
    records: generateAttendanceRecords(42, 35, new Date('2024-08-01'))
  },
  {
    enrollmentNo: 103,
    subject: "Operating Systems",
    year: 2,
    semester: 3,
    branch: "Computer Science Engineering",
    totalLectures: 42,
    lecturesAttended: 41,
    records: generateAttendanceRecords(42, 41, new Date('2024-08-01'))
  },
  
  // Database Management
  {
    enrollmentNo: 101,
    subject: "Database Management",
    year: 2,
    semester: 3,
    branch: "Computer Science Engineering",
    totalLectures: 40,
    lecturesAttended: 36,
    records: generateAttendanceRecords(40, 36, new Date('2024-08-01'))
  },
  {
    enrollmentNo: 102,
    subject: "Database Management",
    year: 2,
    semester: 3,
    branch: "Computer Science Engineering",
    totalLectures: 40,
    lecturesAttended: 32,
    records: generateAttendanceRecords(40, 32, new Date('2024-08-01'))
  },
  {
    enrollmentNo: 103,
    subject: "Database Management",
    year: 2,
    semester: 3,
    branch: "Computer Science Engineering",
    totalLectures: 40,
    lecturesAttended: 38,
    records: generateAttendanceRecords(40, 38, new Date('2024-08-01'))
  },
  
  // Computer Networks
  {
    enrollmentNo: 101,
    subject: "Computer Networks",
    year: 2,
    semester: 3,
    branch: "Computer Science Engineering",
    totalLectures: 38,
    lecturesAttended: 35,
    records: generateAttendanceRecords(38, 35, new Date('2024-08-01'))
  },
  {
    enrollmentNo: 102,
    subject: "Computer Networks",
    year: 2,
    semester: 3,
    branch: "Computer Science Engineering",
    totalLectures: 38,
    lecturesAttended: 30,
    records: generateAttendanceRecords(38, 30, new Date('2024-08-01'))
  },
  {
    enrollmentNo: 103,
    subject: "Computer Networks",
    year: 2,
    semester: 3,
    branch: "Computer Science Engineering",
    totalLectures: 38,
    lecturesAttended: 37,
    records: generateAttendanceRecords(38, 37, new Date('2024-08-01'))
  },
  
  // Software Engineering
  {
    enrollmentNo: 101,
    subject: "Software Engineering",
    year: 2,
    semester: 3,
    branch: "Computer Science Engineering",
    totalLectures: 36,
    lecturesAttended: 34,
    records: generateAttendanceRecords(36, 34, new Date('2024-08-01'))
  },
  {
    enrollmentNo: 102,
    subject: "Software Engineering",
    year: 2,
    semester: 3,
    branch: "Computer Science Engineering",
    totalLectures: 36,
    lecturesAttended: 28,
    records: generateAttendanceRecords(36, 28, new Date('2024-08-01'))
  },
  {
    enrollmentNo: 103,
    subject: "Software Engineering",
    year: 2,
    semester: 3,
    branch: "Computer Science Engineering",
    totalLectures: 36,
    lecturesAttended: 35,
    records: generateAttendanceRecords(36, 35, new Date('2024-08-01'))
  },
];

// Helper function to generate attendance records
function generateAttendanceRecords(totalLectures, attended, startDate) {
  const records = [];
  const currentDate = new Date(startDate);
  let presentCount = 0;
  
  for (let i = 0; i < totalLectures; i++) {
    // Skip weekends
    while (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    let status;
    if (presentCount < attended) {
      // 90% chance of being present if we haven't reached the target
      if (Math.random() < 0.9) {
        status = 'Present';
        presentCount++;
      } else {
        status = 'Absent';
      }
    } else {
      status = 'Absent';
    }
    
    records.push({
      date: new Date(currentDate),
      status: status
    });
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Shuffle the records to make it more realistic
  for (let i = records.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [records[i], records[j]] = [records[j], records[i]];
  }
  
  // Sort by date
  records.sort((a, b) => a.date - b.date);
  
  return records;
}

async function seedAttendance() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if attendance data already exists
    const existingAttendance = await Attendance.find({});
    
    if (existingAttendance.length > 0) {
      console.log(`Found ${existingAttendance.length} existing attendance records.`);
      console.log("Do you want to add more demo data? (Existing data will be preserved)");
      console.log("To clear existing data, run: db.attendances.deleteMany({}) in MongoDB");
    }

    // Insert demo attendance one by one to trigger pre-save hook
    const insertedRecords = [];
    for (const record of demoAttendance) {
      const newRecord = await Attendance.create(record);
      insertedRecords.push(newRecord);
    }
    
    console.log(`✅ Successfully added ${insertedRecords.length} demo attendance records!`);
    console.log("\nDemo attendance includes:");
    console.log("- 3 students (Enrollment: 101, 102, 103)");
    console.log("- 5 subjects: Data Structures, OS, DBMS, CN, Software Engineering");
    console.log("- Computer Science Engineering, Year 2, Semester 3");
    console.log("- Realistic attendance patterns with varying percentages");

    // Show statistics
    console.log("\n📊 Attendance Statistics:");
    for (const record of insertedRecords) {
      console.log(`  Student ${record.enrollmentNo} - ${record.subject}: ${record.percentage}%`);
    }

    await mongoose.connection.close();
    console.log("\n✅ Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding attendance:", error);
    process.exit(1);
  }
}

seedAttendance();
