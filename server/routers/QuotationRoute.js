const express = require('express');
const router = express.Router();
const { getAllQuotes, postSingleQuote, getSingleQuote, deleteSingleQuote, updateSingleQuote, UploadQuoteBackImg } = require('../controllers/QuotationController');
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');
const { uploadImg } = require('../middlewares/multer');

const { QuoteSchemaSchema } = require('../validators/Schemas');
const validate = require('../validators/validate');

// Middleware to parse JSON bodies
router.use(express.json());

// To get All Clients list
router.get('/', authMiddleware(getPermissions('MEDIUM')), getAllQuotes);

// To get Single Client Details
router.get('/:id', authMiddleware(getPermissions('MEDIUM')), getSingleQuote);

// To Add a Client to Clients list
router.post('/add-quote', authMiddleware(getPermissions('MEDIUM')), postSingleQuote);

// To Delete Single Client Details
router.delete('/:id', authMiddleware(getPermissions('MEDIUM')), deleteSingleQuote);

// To Update a Single Client Details
router.put('/:id', authMiddleware(getPermissions('MEDIUM')), updateSingleQuote);

// To Add a Back Images of quote 
router.put('/upload-image/:id', authMiddleware(getPermissions('HIGH')), uploadImg,  UploadQuoteBackImg);

module.exports = router;
