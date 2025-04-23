const Marks = require("../../models/Other/marks.model.js");

const getMarks = async (req, res) => {
    try {
        let Mark = await Marks.find(req.body);
        if (!Mark) {
            return res
                .status(400)
                .json({ success: false, message: "Marks Not Available" });
        }
        const data = {
            success: true,
            message: "All Marks Loaded!",
            Mark,
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const addMarks = async (req, res) => {
    let { enrollmentNo, Quiz1, Quiz2, midSem, endSem } = req.body;
    try {
        let existingMarks = await Marks.findOne({ enrollmentNo });
        if (existingMarks) {
            if (Quiz1) {
                existingMarks.Quiz1 = { ...existingMarks.Quiz1, ...Quiz1 }
            }
            if (Quiz2) {
                existingMarks.Quiz2 = { ...existingMarks.Quiz2, ...Quiz2 }
            }
            if (midSem) {
                existingMarks.midSem = { ...existingMarks.midSem, ...midSem }
            }
            if (endSem) {
                existingMarks.endSem = { ...existingMarks.endSem, ...endSem }
            }
            await existingMarks.save()
            const data = {
                success: true,
                message: "Marks Added!",
            };
            res.json(data);
        } else {
            await Marks.create(req.body);
            const data = {
                success: true,
                message: "Marks Added!",
            };
            res.json(data);
        }
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteMarks = async (req, res) => {
    try {
        let mark = await Marks.findByIdAndDelete(req.params.id);
        if (!mark) {
            return res
                .status(400)
                .json({ success: false, message: "No Marks Data Exists!" });
        }
        const data = {
            success: true,
            message: "Marks Deleted!",
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { getMarks, addMarks, deleteMarks }