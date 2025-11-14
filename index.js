// app create 
const express = require('express');
const app = express();

// Import specific functions using destructuring
const { connectDB } = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');
const upload = require('./routes/FileUpload'); // Import the router

// port finding
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// middleware adding
app.use(express.json());
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// db connection
connectDB();

// cloud connection
cloudinaryConnect();

// api route mounting
// Corrected: Use the variable 'upload' which you defined above
app.use('/api/v1/upload', upload);

// activate server 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});