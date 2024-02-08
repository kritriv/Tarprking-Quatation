const express = require('express');
const router = express.Router();
const { getAllQuotes, postSingleQuote, getSingleQuote, deleteSingleQuote, updateSingleQuote } = require('../controllers/QuotationController');
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');

const { ClientSchema } = require('../validators/Schemas');
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

module.exports = router;
