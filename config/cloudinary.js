const cloudinary = require('cloudinary').v2;
// Note: You usually only need to call require('dotenv').config() once in your main index.js
require('dotenv').config(); 


exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            // These variable names look different from my last example.
            // Please DOUBLE CHECK that they match your .env file EXACTLY.
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        // Add a console log for successful connection
        console.log("Cloudinary configuration successful.");
    } catch (error) {
        console.error('Cloudinary connection error:', error);
        process.exit(1);
    }
}

// DO NOT EXPORT THE CLOUDINARY OBJECT
// module.exports = cloudinary;  <-- DELETE THIS LINE