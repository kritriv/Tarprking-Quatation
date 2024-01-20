const express = require('express');
const router = express.Router();

const { getAllQuotes, createQuote, getSingleQuote, deleteSingleQuote, updateSingleQuote } = require('../controllers/QuotationController');

// To get All Quotes list
router.get('/', getAllQuotes);

// To get Single Quote Details
router.get('/:id', getSingleQuote);

// To Add a Quote to Quotes list
router.post('/add-Quote', createQuote);

// To Delete Single Quote Details
router.delete('/:id', deleteSingleQuote);

// To Update a Single Quote Details
router.put('/:id', updateSingleQuote);

module.exports = router;
