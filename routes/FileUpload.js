const express = require('express');
const router = express.Router();

// --- START OF FIX ---

// Import BOTH controllers from your file
const { localFileUpload, imageUpload } = require("../controllers/fileUpload");

// API ROUTE for local file upload (saves to your 'files' folder)
router.post('/localFileUpload', localFileUpload);

// API ROUTE for Cloudinary image upload (saves to Cloudinary)
router.post('/imageUpload', imageUpload);

// --- END OF FIX ---

module.exports = router;