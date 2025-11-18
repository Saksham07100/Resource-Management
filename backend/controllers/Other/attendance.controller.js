const Attendance = require("../../models/Other/attendance.model.js");
const multer = require('multer');
const path = require('path');

// Configure multer for CSV file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
            cb(null, true);
        } else {
            cb(new Error('Only CSV files are allowed'));
        }
    }
});

// Get attendance records
const getAttendance = async (req, res) => {
    try {
        let attendance = await Attendance.find(req.body);
        if (!attendance) {
            return res
                .status(400)
                .json({ success: false, message: "Attendance Not Available" });
        }
        const data = {
            success: true,
            message: "Attendance Loaded!",
            attendance,
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Mark attendance for students
const markAttendance = async (req, res) => {
    let { enrollmentNo, subject, year, semester, branch, date, status } = req.body;
    try {
        // Find existing attendance record for this student and subject
        let existingAttendance = await Attendance.findOne({ 
            enrollmentNo, 
            subject, 
            year, 
            semester,
            branch 
        });

        if (existingAttendance) {
            // Check if attendance for this date already exists
            const dateExists = existingAttendance.records.some(
                record => new Date(record.date).toDateString() === new Date(date).toDateString()
            );

            if (dateExists) {
                return res.status(400).json({ 
                    success: false, 
                    message: "Attendance already marked for this date!" 
                });
            }

            // Add new attendance record
            existingAttendance.records.push({ date, status });
            existingAttendance.totalLectures += 1;
            
            if (status === 'Present' || status === 'Late') {
                existingAttendance.lecturesAttended += 1;
            }
            
            await existingAttendance.save();
            
            const data = {
                success: true,
                message: "Attendance Marked!",
                attendance: existingAttendance,
            };
            res.json(data);
        } else {
            // Create new attendance record
            const lecturesAttended = (status === 'Present' || status === 'Late') ? 1 : 0;
            
            const newAttendance = await Attendance.create({
                enrollmentNo,
                subject,
                year,
                semester,
                branch,
                totalLectures: 1,
                lecturesAttended,
                records: [{ date, status }]
            });
            
            const data = {
                success: true,
                message: "Attendance Marked!",
                attendance: newAttendance,
            };
            res.json(data);
        }
    } catch (error) {
        console.error(error.message);
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Mark attendance for multiple students at once
const markBulkAttendance = async (req, res) => {
    let { students, subject, year, semester, branch, date } = req.body;
    
    try {
        const results = [];
        
        for (let student of students) {
            const { enrollmentNo, status } = student;
            
            let existingAttendance = await Attendance.findOne({ 
                enrollmentNo, 
                subject, 
                year, 
                semester,
                branch 
            });

            if (existingAttendance) {
                // Check if attendance for this date already exists
                const dateExists = existingAttendance.records.some(
                    record => new Date(record.date).toDateString() === new Date(date).toDateString()
                );

                if (!dateExists) {
                    existingAttendance.records.push({ date, status });
                    existingAttendance.totalLectures += 1;
                    
                    if (status === 'Present' || status === 'Late') {
                        existingAttendance.lecturesAttended += 1;
                    }
                    
                    await existingAttendance.save();
                    results.push({ enrollmentNo, success: true });
                } else {
                    results.push({ enrollmentNo, success: false, message: "Already marked" });
                }
            } else {
                const lecturesAttended = (status === 'Present' || status === 'Late') ? 1 : 0;
                
                await Attendance.create({
                    enrollmentNo,
                    subject,
                    year,
                    semester,
                    branch,
                    totalLectures: 1,
                    lecturesAttended,
                    records: [{ date, status }]
                });
                
                results.push({ enrollmentNo, success: true });
            }
        }
        
        const data = {
            success: true,
            message: "Bulk Attendance Marked!",
            results,
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Update attendance record
const updateAttendance = async (req, res) => {
    let { attendanceId, date, status } = req.body;
    
    try {
        let attendance = await Attendance.findById(attendanceId);
        
        if (!attendance) {
            return res.status(400).json({ 
                success: false, 
                message: "Attendance record not found!" 
            });
        }
        
        // Find the specific record to update
        const recordIndex = attendance.records.findIndex(
            record => new Date(record.date).toDateString() === new Date(date).toDateString()
        );
        
        if (recordIndex === -1) {
            return res.status(400).json({ 
                success: false, 
                message: "Attendance record for this date not found!" 
            });
        }
        
        const oldStatus = attendance.records[recordIndex].status;
        attendance.records[recordIndex].status = status;
        
        // Update lecturesAttended count
        if (oldStatus === 'Absent' && (status === 'Present' || status === 'Late')) {
            attendance.lecturesAttended += 1;
        } else if ((oldStatus === 'Present' || oldStatus === 'Late') && status === 'Absent') {
            attendance.lecturesAttended -= 1;
        }
        
        await attendance.save();
        
        const data = {
            success: true,
            message: "Attendance Updated!",
            attendance,
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Delete attendance record
const deleteAttendance = async (req, res) => {
    try {
        let attendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!attendance) {
            return res
                .status(400)
                .json({ success: false, message: "No Attendance Data Exists!" });
        }
        const data = {
            success: true,
            message: "Attendance Deleted!",
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get attendance statistics
const getAttendanceStats = async (req, res) => {
    try {
        const { enrollmentNo } = req.body;
        
        let attendanceRecords = await Attendance.find({ enrollmentNo });
        
        if (!attendanceRecords || attendanceRecords.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "No attendance records found!" 
            });
        }
        
        const stats = attendanceRecords.map(record => ({
            subject: record.subject,
            totalLectures: record.totalLectures,
            lecturesAttended: record.lecturesAttended,
            percentage: record.percentage,
            year: record.year,
            semester: record.semester,
            branch: record.branch,
        }));
        
        const data = {
            success: true,
            message: "Attendance Statistics!",
            stats,
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Upload attendance from CSV file
const uploadAttendanceCSV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "No file uploaded" 
            });
        }

        const fs = require('fs');
        const csvContent = fs.readFileSync(req.file.path, 'utf-8');
        const lines = csvContent.split('\n');
        
        // Parse CSV header
        const headers = lines[0].split(',').map(h => h.trim());
        
        // Validate required columns
        const requiredColumns = ['enrollmentNo', 'subject', 'year', 'semester', 'branch', 'date', 'status'];
        const missingColumns = requiredColumns.filter(col => !headers.includes(col));
        
        if (missingColumns.length > 0) {
            fs.unlinkSync(req.file.path); // Clean up uploaded file
            return res.status(400).json({ 
                success: false, 
                message: `Missing required columns: ${missingColumns.join(', ')}` 
            });
        }

        const results = { success: 0, failed: 0, errors: [] };

        // Process each row
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue; // Skip empty lines
            
            const values = lines[i].split(',').map(v => v.trim());
            const row = {};
            
            headers.forEach((header, index) => {
                row[header] = values[index];
            });

            try {
                const { enrollmentNo, subject, year, semester, branch, date, status } = row;
                
                // Validate data
                if (!enrollmentNo || !subject || !year || !semester || !branch || !date || !status) {
                    results.failed++;
                    results.errors.push(`Row ${i + 1}: Missing required fields`);
                    continue;
                }

                // Find or create attendance record
                let existingAttendance = await Attendance.findOne({ 
                    enrollmentNo: parseInt(enrollmentNo), 
                    subject, 
                    year: parseInt(year), 
                    semester: parseInt(semester),
                    branch 
                });

                const attendanceDate = new Date(date);

                if (existingAttendance) {
                    // Check if attendance for this date already exists
                    const dateExists = existingAttendance.records.some(
                        record => new Date(record.date).toDateString() === attendanceDate.toDateString()
                    );

                    if (!dateExists) {
                        existingAttendance.records.push({ date: attendanceDate, status });
                        existingAttendance.totalLectures += 1;
                        
                        if (status === 'Present' || status === 'Late') {
                            existingAttendance.lecturesAttended += 1;
                        }
                        
                        await existingAttendance.save();
                        results.success++;
                    } else {
                        results.failed++;
                        results.errors.push(`Row ${i + 1}: Attendance already exists for ${enrollmentNo} on ${date}`);
                    }
                } else {
                    const lecturesAttended = (status === 'Present' || status === 'Late') ? 1 : 0;
                    
                    await Attendance.create({
                        enrollmentNo: parseInt(enrollmentNo),
                        subject,
                        year: parseInt(year),
                        semester: parseInt(semester),
                        branch,
                        totalLectures: 1,
                        lecturesAttended,
                        records: [{ date: attendanceDate, status }]
                    });
                    
                    results.success++;
                }
            } catch (error) {
                results.failed++;
                results.errors.push(`Row ${i + 1}: ${error.message}`);
            }
        }

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        const data = {
            success: true,
            message: `Upload completed: ${results.success} records added, ${results.failed} failed`,
            results,
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error);
        
        // Clean up uploaded file in case of error
        if (req.file && require('fs').existsSync(req.file.path)) {
            require('fs').unlinkSync(req.file.path);
        }
        
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { 
    getAttendance, 
    markAttendance, 
    markBulkAttendance,
    updateAttendance,
    deleteAttendance,
    getAttendanceStats,
    uploadAttendanceCSV,
    upload
};
