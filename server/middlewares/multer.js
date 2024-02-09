const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const uploadDir = process.env.UploadPath;

try {
    fs.accessSync(uploadDir, fs.constants.R_OK | fs.constants.W_OK);
} catch (error) {
    console.error('Error accessing upload directory:', error);
    throw error;
}

const generateUniqueFilename = (originalName) => {
    // return `${Date.now()}-${originalName}`;
    return `${originalName}`;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            fs.mkdirSync(uploadDir, { recursive: true });
            cb(null, uploadDir);
        } catch (error) {
            console.error('Error creating upload directory:', error);
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        const uniqueFilename = generateUniqueFilename(file.originalname);
        cb(null, uniqueFilename);
    },
});

const fileFilter = (req, file, cb) => {
    const isImage = file.mimetype.startsWith('image/');
    const maxImageCount = req.accepts('singleImage') ? 1 : null;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!isImage || (maxImageCount && req.files.length >= maxImageCount)) {
        req.fileValidationError = 'Invalid file type or too many images';
        return cb(null, false);
    }

    if (!allowedTypes.includes(file.mimetype)) {
        req.fileValidationError = 'Invalid file type. Only images allowed';
        return cb(null, false);
    }

    cb(null, true);
};

const uploadImg = multer({ storage, fileFilter }).single('image');

module.exports = { uploadImg, storage };
