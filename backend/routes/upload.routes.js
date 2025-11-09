const express = require("express");
const multer = require("multer");
const { handleUpload } = require("../controllers/upload.controller");

const router = express.Router();

// store uploaded files under /uploads
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), handleUpload);

module.exports = router;
