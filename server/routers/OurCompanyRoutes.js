const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');

const { getAllOurCompany, postSingleOurCompany, getSingleOurCompany, deleteSingleOurCompany, updateSingleOurCompany } = require('../controllers/OurCompanyController');

const { OurCompanySchema } = require('../validators/Schemas');
const validate = require('../validators/validate');

// To get All OurCompany list

router.get('/', authMiddleware(getPermissions('HIGH')), getAllOurCompany);

// To Add a OurCompany to OurCompany list
router.post('/add-company-detail', authMiddleware(getPermissions('HIGH')), validate(OurCompanySchema), postSingleOurCompany);

// To get Single OurCompany Details
router.get('/:id', authMiddleware(getPermissions('HIGH')), getSingleOurCompany);

// To Delete Single OurCompany Details
router.delete('/:id', authMiddleware(getPermissions('HIGH')), deleteSingleOurCompany);

// To Update a Single OurCompany Details
router.put('/:id', authMiddleware(getPermissions('HIGH')), validate(OurCompanySchema), updateSingleOurCompany);

module.exports = router;
