const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');

const { getAllUsers, postSingleUser, getSingleUser, deleteSingleUser, updateSingleUser } = require('../controllers/UserController');

router.get('/test', authMiddleware(getPermissions('USER')), async (req, res) => {
    return res.send('This is user routes');
});

// To get All Users list
router.get('/', getAllUsers);

// To Add a User to Users list
router.post('/add-user', postSingleUser);

// To get Single User Details
router.get('/:id', getSingleUser);

// To Delete Single User Details
router.delete('/:id', deleteSingleUser);

// To Update a Single User Details
router.put('/:id', updateSingleUser);

module.exports = router;
