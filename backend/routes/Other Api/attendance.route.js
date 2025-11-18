const express = require("express");
const { 
    getAttendance, 
    markAttendance, 
    markBulkAttendance,
    updateAttendance,
    deleteAttendance,
    getAttendanceStats,
    uploadAttendanceCSV,
    upload
} = require("../../controllers/Other/attendance.controller");
const router = express.Router();

router.post("/getAttendance", getAttendance);
router.post("/markAttendance", markAttendance);
router.post("/markBulkAttendance", markBulkAttendance);
router.post("/updateAttendance", updateAttendance);
router.delete("/deleteAttendance/:id", deleteAttendance);
router.post("/getAttendanceStats", getAttendanceStats);
router.post("/uploadCSV", upload.single('file'), uploadAttendanceCSV);

module.exports = router;
