# 📋 Attendance Portal - Quick Reference Card

## 🚀 Start Everything

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm start
```

## 📊 Demo Data

### Seed Demo Attendance
```bash
cd backend
node seedAttendance.js
```

### Demo Accounts
- **Students**: 101, 102, 103
- **Branch**: Computer Science Engineering
- **Year/Semester**: Year 2, Semester 3
- **Subjects**: Data Structures, OS, DBMS, CN, Software Engineering

## 📤 CSV Upload

### Required Columns
```csv
enrollmentNo,subject,year,semester,branch,date,status
```

### Example Row
```csv
101,Data Structures,2,3,Computer Science Engineering,2024-11-15,Present
```

### Status Options
- `Present` - Attended
- `Absent` - Not attended
- `Late` - Attended (late)

## 🎨 Color Coding

- 🟢 **Green**: ≥75% (Good)
- 🟡 **Yellow**: 60-75% (Warning)
- 🔴 **Red**: <60% (Critical)

## 🔧 Useful Commands

```bash
# Seed data
node backend/seedAttendance.js

# Clear data
node backend/clearAttendance.js

# Clear and reseed
cd backend && node clearAttendance.js && node seedAttendance.js

# Interactive menu
./manage-attendance.sh
```

## 📍 URLs

- **Backend**: http://localhost:8001
- **Frontend**: http://localhost:3000
- **API Base**: http://localhost:8001/api

## 🔌 API Endpoints

```
POST   /api/attendance/getAttendance
POST   /api/attendance/markAttendance
POST   /api/attendance/markBulkAttendance
POST   /api/attendance/updateAttendance
DELETE /api/attendance/deleteAttendance/:id
POST   /api/attendance/getAttendanceStats
POST   /api/attendance/uploadCSV
```

## 📖 Documentation

1. **IMPLEMENTATION_SUMMARY.md** - What was done
2. **README_ATTENDANCE.md** - Complete guide
3. **ATTENDANCE_SETUP.md** - Technical setup
4. **FACULTY_ATTENDANCE_GUIDE.md** - Faculty guide

## ✅ Quick Test

### As Faculty:
1. Login → Attendance
2. Select: CSE, Year 2, Sem 3, Data Structures
3. Load Students
4. Mark attendance → Submit

### As Student:
1. Login (101/102/103) → Attendance
2. View subject cards
3. Click card for details

## 🆘 Troubleshooting

**No data showing?**
```bash
cd backend && node seedAttendance.js
```

**CSV upload fails?**
- Check file is .csv format
- Verify columns match template
- Download sample from portal

**Backend not starting?**
```bash
cd backend && npm install
```

**Frontend not starting?**
```bash
cd frontend && npm install
```

## 📦 File Structure

```
backend/
├── models/Other/attendance.model.js
├── controllers/Other/attendance.controller.js
├── routes/Other Api/attendance.route.js
├── seedAttendance.js
├── clearAttendance.js
└── attendance_sample.csv

frontend/src/Screens/
├── Faculty/Attendance.jsx
└── Student/Attendance.jsx
```

## 💡 Pro Tips

1. **Download CSV template** before creating your own
2. **Use Mark All Present** then adjust (faster)
3. **Check date format** (YYYY-MM-DD) in CSV
4. **Test with demo data** first
5. **Keep CSV backups** for records

## 🎯 Remember

- Can't mark same date twice
- Late counts as attended
- Percentage auto-calculated
- CSV validates automatically
- Colors help identify issues

---

**Quick Help**: Check FACULTY_ATTENDANCE_GUIDE.md for detailed steps!

**Version**: 1.0 | **Date**: Nov 19, 2025
