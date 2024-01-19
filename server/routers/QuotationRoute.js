const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');

const { getAllQuotes, createQuote, getSingleQuote, deleteSingleQuote, updateSingleQuote } = require('../controllers/QuotationController');

// To get All Quotes list
router.get('/Quotes', getAllQuotes);

// To get Single Quote Details
router.get('/Quotes/:id', getSingleQuote);

// To Add a Quote to Quotes list
router.post('/Quotes/add-Quote', createQuote);

// To Delete Single Quote Details
router.delete('/Quotes/:id', deleteSingleQuote);

// To Update a Single Quote Details
router.put('/Quotes/:id', updateSingleQuote);

module.exports = router;
