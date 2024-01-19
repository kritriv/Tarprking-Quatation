const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');

const { getAllUsers, postSingleUser, getSingleUser, deleteSingleUser, updateSingleUser } = require('../controllers/UserController');
const { getAllQuotes, createQuote, getSingleQuote, deleteSingleQuote, updateSingleQuote } = require('../controllers/QuotationController');

router.get('/', authMiddleware(['USER', 'ADMIN', 'SUPERADMIN']), async (req, res) => {
    return res.send('This is user routes');
});

// To get All Users list
router.get('/users', getAllUsers);

// To Add a User to Users list
router.post('/users/add-user', postSingleUser);

// To get Single User Details
router.get('/users/:id', getSingleUser);

// To Delete Single User Details
router.delete('/users/:id', deleteSingleUser);

// To Update a Single User Details
router.put('/users/:id', updateSingleUser);

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
