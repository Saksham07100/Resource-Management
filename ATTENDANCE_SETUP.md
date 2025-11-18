# Attendance Portal - Setup Guide

## Overview
The attendance portal allows faculty to mark attendance manually or upload via CSV files. Students can view their attendance records with detailed statistics.

## Features
- ✅ Manual attendance marking for entire classes
- ✅ CSV file upload for bulk attendance import
- ✅ Demo attendance data seeding
- ✅ Real-time attendance tracking with percentage calculation
- ✅ Student-wise attendance viewing

---

## Backend Setup

### 1. Seed Demo Attendance Data

Run the following command to add demo attendance records:

```bash
cd backend
node seedAttendance.js
```

This will create:
- Attendance records for 3 students (Enrollment: 101, 102, 103)
- 5 subjects: Data Structures, Operating Systems, Database Management, Computer Networks, Software Engineering
- Computer Science Engineering branch, Year 2, Semester 3
- Realistic attendance patterns with varying percentages

### 2. Start the Backend Server

```bash
cd backend
npm start
# or for development
npm run dev
```

The server will run on `http://localhost:8001`

---

## CSV Upload Feature

### CSV Format

The CSV file must include the following columns:
- `enrollmentNo` - Student enrollment number
- `subject` - Subject name
- `year` - Academic year (1, 2, 3, 4)
- `semester` - Semester number (1-8)
- `branch` - Branch name (e.g., "Computer Science Engineering")
- `date` - Date in format YYYY-MM-DD
- `status` - Attendance status (Present, Absent, Late)

### Sample CSV File

```csv
enrollmentNo,subject,year,semester,branch,date,status
101,Data Structures,2,3,Computer Science Engineering,2024-11-01,Present
102,Data Structures,2,3,Computer Science Engineering,2024-11-01,Absent
103,Data Structures,2,3,Computer Science Engineering,2024-11-01,Present
101,Operating Systems,2,3,Computer Science Engineering,2024-11-02,Present
102,Operating Systems,2,3,Computer Science Engineering,2024-11-02,Late
```

### How to Upload CSV

1. Log in as Faculty
2. Navigate to the Attendance section
3. Click "📤 Upload CSV" button
4. Download the sample CSV template if needed
5. Select your CSV file
6. Click "Upload"

The system will:
- Validate the CSV format
- Check for duplicate entries
- Auto-calculate attendance percentages
- Display success/error messages for each record

---

## Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start the Frontend

```bash
npm start
```

The app will run on `http://localhost:3000`

---

## Usage Guide

### For Faculty

#### Manual Attendance Marking
1. Select Branch, Year, Semester, Subject, and Date
2. Click "Load Student Data"
3. Mark individual student attendance or use bulk actions:
   - Mark All Present
   - Mark All Absent
4. Click "Submit Attendance"

#### CSV Upload
1. Click "📤 Upload CSV" button
2. Download sample CSV template (optional)
3. Prepare your CSV file with required columns
4. Upload the file
5. Review success/error messages

### For Students

1. Log in to the student portal
2. Click on "Attendance" in the menu
3. View all subject-wise attendance:
   - Overall percentage (color-coded)
   - Total lectures
   - Lectures attended
4. Click on any subject card to view detailed records:
   - Date-wise attendance
   - Status for each lecture
5. View overall summary:
   - Total subjects
   - Average attendance
   - Subjects below 75%

---

## Demo Data Details

### Students
- Enrollment No: 101, 102, 103

### Subjects & Approximate Attendance
**Student 101:**
- Data Structures: ~93%
- Operating Systems: ~93%
- Database Management: ~90%
- Computer Networks: ~92%
- Software Engineering: ~94%

**Student 102:**
- Data Structures: ~84%
- Operating Systems: ~83%
- Database Management: ~80%
- Computer Networks: ~79%
- Software Engineering: ~78%

**Student 103:**
- Data Structures: ~89%
- Operating Systems: ~98%
- Database Management: ~95%
- Computer Networks: ~97%
- Software Engineering: ~97%

---

## API Endpoints

### Attendance APIs

- `POST /api/attendance/getAttendance` - Get attendance records
- `POST /api/attendance/markAttendance` - Mark single student attendance
- `POST /api/attendance/markBulkAttendance` - Mark multiple students
- `POST /api/attendance/updateAttendance` - Update attendance record
- `DELETE /api/attendance/deleteAttendance/:id` - Delete attendance
- `POST /api/attendance/getAttendanceStats` - Get attendance statistics
- `POST /api/attendance/uploadCSV` - Upload CSV file

---

## Troubleshooting

### CSV Upload Issues

**Error: "Missing required columns"**
- Ensure all required columns are present in your CSV
- Column names must match exactly (case-sensitive)

**Error: "Attendance already exists for this date"**
- The system prevents duplicate entries
- Check if attendance for that date is already marked

**File Upload Fails**
- Ensure the file is in CSV format
- Check file size (should be reasonable)
- Verify the backend uploads directory exists

### Demo Data Not Showing

1. Check if MongoDB is connected:
```bash
cd backend
node seedAttendance.js
```

2. Verify data in MongoDB:
```bash
# Connect to MongoDB and check
db.attendances.find({})
```

3. Check student enrollment numbers match in both:
   - Student records
   - Attendance records

---

## Notes

- Attendance percentage is auto-calculated
- Percentages below 75% are highlighted in red
- Percentages between 60-75% are highlighted in yellow
- Percentages above 75% are highlighted in green
- CSV uploads preserve existing data
- Duplicate date entries are prevented
- "Late" status counts as attended

---

## Support

For issues or questions:
1. Check the browser console for errors
2. Check backend terminal logs
3. Verify MongoDB connection
4. Ensure all dependencies are installed
