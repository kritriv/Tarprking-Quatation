const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');

const { getAllUsers, postSingleUser, getSingleUser, deleteSingleUser, updateSingleUser } = require('../controllers/UserController');

router.get('/', authMiddleware(getPermissions('USER')), async (req, res) => {
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

module.exports = router;
