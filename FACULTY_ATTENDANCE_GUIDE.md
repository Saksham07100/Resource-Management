# Faculty Attendance Portal - Quick Guide

## 🎯 Features Available

### 1. Manual Attendance Marking
Mark attendance for your class students one by one or in bulk.

### 2. CSV Upload
Upload attendance data from Excel/CSV files for quick bulk entry.

### 3. View & Track
See attendance statistics and records for your classes.

---

## 📝 Manual Attendance Marking

### Steps:
1. **Select Class Details**
   - Branch (e.g., Computer Science Engineering)
   - Year (1, 2, 3, or 4)
   - Semester (1-8)
   - Subject
   - Date

2. **Load Students**
   - Click "Load Student Data" button
   - System will fetch all students matching your criteria

3. **Mark Attendance**
   - For each student, select status from dropdown:
     - **Present** - Student attended class
     - **Absent** - Student was absent
     - **Late** - Student came late (counts as attended)
   
4. **Quick Actions**
   - **Mark All Present** - Sets all students as Present
   - **Mark All Absent** - Sets all students as Absent
   - Then adjust individual students as needed

5. **Submit**
   - Click "Submit Attendance" to save
   - System prevents duplicate entries for same date

---

## 📤 CSV Upload Feature

### When to Use:
- You have attendance records in Excel
- Marking attendance for multiple days/classes
- Bulk import of historical data
- Faster than manual entry

### CSV File Format:

Your CSV must have these columns (exact names):
```
enrollmentNo,subject,year,semester,branch,date,status
```

### Example CSV:
```csv
enrollmentNo,subject,year,semester,branch,date,status
101,Data Structures,2,3,Computer Science Engineering,2024-11-15,Present
102,Data Structures,2,3,Computer Science Engineering,2024-11-15,Absent
103,Data Structures,2,3,Computer Science Engineering,2024-11-15,Present
```

### Creating CSV from Excel:

**Option 1: Download Template**
1. Click "📤 Upload CSV" button
2. Click "📥 Download Sample CSV"
3. Open in Excel
4. Fill in your data
5. Save As → CSV format

**Option 2: Create in Excel**
1. Open Excel/Google Sheets
2. Create columns: enrollmentNo, subject, year, semester, branch, date, status
3. Fill in data:
   - **enrollmentNo**: Student ID (e.g., 101, 102)
   - **subject**: Full subject name (e.g., "Data Structures")
   - **year**: 1, 2, 3, or 4
   - **semester**: 1 to 8
   - **branch**: Full branch name (e.g., "Computer Science Engineering")
   - **date**: Format YYYY-MM-DD (e.g., 2024-11-15)
   - **status**: Present, Absent, or Late
4. Save As → CSV (Comma delimited)

### Upload Steps:
1. Click "📤 Upload CSV" button
2. Click "Choose File" or drag & drop
3. Select your CSV file
4. Click "Upload"
5. Wait for confirmation message
6. Review any errors (if shown in console)

### Important Notes:
- ✅ System checks for duplicate dates
- ✅ Auto-calculates attendance percentage
- ✅ Validates all required fields
- ✅ Shows success/error count after upload
- ❌ Cannot upload same date twice for a student

---

## 📊 Understanding Attendance Status

### Color Coding:
- 🟢 **Green (≥75%)** - Good attendance
- 🟡 **Yellow (60-75%)** - Warning - Below minimum
- 🔴 **Red (<60%)** - Critical - Poor attendance

### Status Types:
- **Present** - Counts as attended (adds to lectures attended)
- **Late** - Counts as attended (adds to lectures attended)
- **Absent** - Does not count (increases total only)

### Percentage Calculation:
```
Attendance % = (Lectures Attended / Total Lectures) × 100
```

---

## 💡 Tips & Best Practices

### For Manual Entry:
1. Mark attendance on the same day for accuracy
2. Use "Mark All Present" then adjust absences (faster)
3. Double-check before submitting (cannot edit easily)

### For CSV Upload:
1. Always download and use the sample template
2. Keep a backup of your CSV files
3. Test with a small file first
4. Verify dates are in YYYY-MM-DD format
5. Check for typos in branch/subject names
6. Ensure enrollment numbers match student records

### Common Mistakes to Avoid:
- ❌ Wrong date format (use YYYY-MM-DD)
- ❌ Misspelled subject names
- ❌ Wrong year/semester combination
- ❌ Duplicate entries for same date
- ❌ Missing required columns in CSV
- ❌ Using Excel date format (convert to text)

---

## 🔧 Troubleshooting

### "Attendance already marked for this date"
- Check if you already submitted attendance for this date
- Verify the date in your CSV file
- Contact admin to modify existing records

### "No students found"
- Verify branch name spelling
- Check year and semester values
- Ensure students are registered in the system

### CSV Upload Fails
- Open CSV in Notepad/TextEdit to verify format
- Check for extra commas or special characters
- Ensure all columns are present
- File must be .csv extension

### File Won't Upload
- Check file size (should be reasonable)
- Ensure it's a CSV file, not Excel (.xlsx)
- Try downloading sample and copying your data into it

---

## 📞 Support

**Need Help?**
1. Check the ATTENDANCE_SETUP.md file for detailed technical info
2. Contact system administrator
3. Check browser console (F12) for error details

**Demo Data Available:**
- Students: 101, 102, 103
- Subjects: Data Structures, Operating Systems, Database Management, Computer Networks, Software Engineering
- Branch: Computer Science Engineering
- Year 2, Semester 3

---

## ✅ Quick Checklist

Before submitting attendance:
- [ ] Selected correct branch
- [ ] Selected correct year and semester
- [ ] Selected correct subject
- [ ] Verified the date
- [ ] Checked all student statuses
- [ ] Reviewed for any mistakes

Before CSV upload:
- [ ] CSV has all required columns
- [ ] Date format is YYYY-MM-DD
- [ ] All enrollment numbers are valid
- [ ] Subject and branch names match exactly
- [ ] No duplicate dates in the file
- [ ] Tested with sample data first

---

**Last Updated:** November 19, 2025
**Version:** 1.0
