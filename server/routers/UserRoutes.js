const express = require('express');
const router = express.Router();
const { getAllUsers, postSingleUser, getSingleUser, deleteSingleUser, updateSingleUser } = require('../controllers/UserController');
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');

const {Userschema} = require('../validators/Schemas');
const validate = require('../validators/validate');

// Middleware to parse JSON bodies
router.use(express.json());

// To get All Users list
router.get('/', authMiddleware(getPermissions('MEDIUM')), getAllUsers);

// To get Single User Details
router.get('/:id', authMiddleware(getPermissions('MEDIUM')), getSingleUser);

// To Add a User to Users list
router.post('/add-user', authMiddleware(getPermissions('MEDIUM')), validate(Userschema), postSingleUser);

// To Delete Single User Details
router.delete('/:id', authMiddleware(getPermissions('MEDIUM')), deleteSingleUser);

// To Update a Single User Details
router.put('/:id', authMiddleware(getPermissions('MEDIUM')), validate(Userschema), updateSingleUser);

module.exports = router;
