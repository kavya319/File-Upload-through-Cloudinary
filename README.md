**📦 Cloudinary File Upload Project**

This repository contains an ongoing project where I am building a file upload system using Cloudinary.
The goal is to allow users to upload images or files from a frontend application and store them securely on Cloudinary's cloud storage.

**🚧 Note: The project is still under development and not fully completed.**

*📌 Project Overview*

This project demonstrates how to:

Upload files (images/documents) from the client

Send them to a backend/API

Upload those files to Cloudinary

Return the secure Cloudinary URL back to the user

It also includes file validation, error handling, and integration with environment variables for security.

*🚀 Tech Stack*

Frontend:  Vite 

Backend: Node.js + Express

Cloud Storage: Cloudinary

HTTP Client: Axios / Fetch

Environment Config: dotenv

File Handling: multer

🧠 What I Learned

During this project, I learned:

✔ How file uploads work in web apps

How to capture files from the frontend (using <input type="file">)

How multipart form data is sent to the backend

✔ How to use Cloudinary for cloud storage

Setting up Cloudinary account

Getting Cloudinary API keys

Securing keys using .env

Uploading files using Cloudinary SDK

Getting the resulting secure_url

✔ How to build an upload API

Creating routes for file upload

Handling files using multer / raw buffers

Handling errors when uploads fail

✔ General backend skills

Using environment variables

Structuring backend code

Connecting frontend and backend

Testing file uploads with tools like Postman

✔ Debugging and handling real-world issues

CORS issues

File limits

Wrong API keys

Incorrect form encoding

Cloudinary upload failures

These learnings helped me understand how real production apps manage media uploads securely and efficiently.
