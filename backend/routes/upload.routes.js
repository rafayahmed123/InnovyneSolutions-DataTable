const express = require("express");
const multer = require("multer");
const { handleUpload } = require("../controllers/upload.controller");
const { updateFile } = require("../controllers/file.controller");

const router = express.Router();

// store uploaded files under /uploads
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), handleUpload);

// update file content (overwrite CSV/JSON)
router.patch("/files/update", updateFile);

module.exports = router;
