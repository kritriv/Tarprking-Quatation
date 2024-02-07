const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');

const { getAllTermAndCondition, postSingleTermAndCondition, getSingleTermAndCondition, deleteSingleTermAndCondition, updateSingleTermAndCondition } = require('../controllers/TermAndConditionController');

const { TermAndConditionSchema } = require('../validators/Schemas');
const validate = require('../validators/validate');

// To get All TermAndCondition list

router.get('/', authMiddleware(getPermissions('HIGH')), getAllTermAndCondition);

// To Add a TermAndCondition to TermAndCondition list
router.post('/add-tnc', authMiddleware(getPermissions('HIGH')), validate(TermAndConditionSchema), postSingleTermAndCondition);

// To get Single TermAndCondition Details
router.get('/:id', authMiddleware(getPermissions('HIGH')), getSingleTermAndCondition);

// To Delete Single TermAndCondition Details
router.delete('/:id', authMiddleware(getPermissions('HIGH')), deleteSingleTermAndCondition);

// To Update a Single TermAndCondition Details
router.put('/:id', authMiddleware(getPermissions('HIGH')), validate(TermAndConditionSchema), updateSingleTermAndCondition);

module.exports = router;
