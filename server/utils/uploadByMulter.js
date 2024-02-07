const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = process.env.UploadPath;

        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueFilename = `${file.originalname.split('.')[0]}.${file.mimetype.split('/')[1]}`;
        cb(null, uniqueFilename);
    },
});

// File filter for single image upload and validation
const fileFilter = (req, file, cb) => {
    if (req.file) {
        req.fileValidationError = 'Only one file can be uploaded';
        return cb(null, false);
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.mimetype)) {
        req.fileValidationError = 'Invalid file type. Only images are allowed';
        return cb(null, false);
    }

    cb(null, true);
};

const uploadImg = multer({ storage, fileFilter }).single('image');

module.exports = { uploadImg, storage };
