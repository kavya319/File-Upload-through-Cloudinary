// At the very top of the file, add this line to import the 'path' module
const path = require("path"); 
const File = require('../models/File');
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log("FILE -> ", file);

        // --- THIS IS THE CORRECTED LINE ---
        // Use path.join() to create a reliable, OS-independent file path
        let uploadPath = path.join(__dirname, "..", "files", Date.now() + `.${file.name.split('.').pop()}`); // to check the filw type so that we can open it accordingly

        console.log("PATH -> ", uploadPath);

        // Move the file using the new, correct path
        file.mv(uploadPath, async (err) => {
            if (err) {
                console.error("Error in file.mv callback:", err);
                return res.status(500).json({
                    success: false,
                    message: "Error occurred while moving the file",
                });
            }
            
            // Database entry logic remains the same
            try {
                const fileData = await File.create({
                    name: file.name,
                    path: uploadPath,
                });
                res.json({
                    success: true,
                    message: "File uploaded and database entry created successfully",
                    data: fileData,
                });
            } catch (dbError) {
                console.error("Error creating database entry:", dbError);
                res.status(500).json({
                    success: false,
                    message: "File was uploaded, but failed to save to database.",
                });
            }
        });

    } catch (error) {
        console.error("Error in outer try-catch block:", error);
        res.status(400).json({
            success: false,
            message: "File upload failed. Please check if a file was selected.",
        });
    }
};
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
    // we will upload the file to cloudinary here 
    const options = { folder };
    console.log("Uploading to Cloudinary with options:", file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
// ... (keep all the code above this handler)

// image upload ka handler 
exports.imageUpload = async (req, res) => {
    try {
        // data fetch 
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log("FILE -> ", file);

        const supportedTypes = ["png", "jpeg", "jpg"];
        const fileType = file.name.split('.').pop().toLowerCase(); // to get the file type

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported. Only .png, .jpeg and .jpg are allowed"
            });
        }

        // --- START OF FIX ---

        // File format is supported, upload to Cloudinary
        console.log("Uploading to Cloudinary...");
        const response = await uploadFileToCloudinary(file, "KavyaFolder");
        console.log("CLOUDINARY RESPONSE -> ", response);

        // Check if upload was successful (response object will have secure_url)
        if (!response || !response.secure_url) {
            return res.status(500).json({
                success: false,
                message: "Cloudinary upload failed. Response was: " + JSON.stringify(response),
            });
        }

        // Create entry in the database
        const fileData = await File.create({
            name,
            ImageUrl: response.secure_url, // Save the Cloudinary URL
            tags: tags, // Assuming tags is sent correctly (e.g., as a comma-separated string)
            email
        });
        
        // Send a success response
        res.json({
            success: true,
            message: "Image uploaded to Cloudinary and database entry created successfully",
            data: fileData,
        });

        // --- END OF FIX ---

    } catch (error) {
        console.error("Error in imageUpload handler:", error); // More specific logging
        res.status(400).json({
            success: false,
            message: "Image upload failed.",
            error: error.message
        });
    }
};