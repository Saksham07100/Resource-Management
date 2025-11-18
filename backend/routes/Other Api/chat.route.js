const express = require("express");
const { askDoubt } = require("../../controllers/Other/chat.controller");

const router = express.Router();

router.post("/ask", askDoubt);

module.exports = router;

