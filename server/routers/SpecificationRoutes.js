const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');

const { getAllSpecifications, postSingleSpecification, getSingleSpecification, deleteSingleSpecification, updateSingleSpecification } = require('../controllers/SpecificationController');

const { SpecificationSchema } = require('../validators/Schemas');
const validate = require('../validators/validate');

// To get All Specifications list
router.get('/', authMiddleware(getPermissions('HIGH')), getAllSpecifications);

// To Add a Specification to Specifications list
router.post('/add-specification', authMiddleware(getPermissions('HIGH')), validate(SpecificationSchema), postSingleSpecification);

// To get Single Specification Details
router.get('/:id', authMiddleware(getPermissions('HIGH')), getSingleSpecification);

// To Delete Single Specification Details
router.delete('/:id', authMiddleware(getPermissions('HIGH')), deleteSingleSpecification);

// To Update a Single Specification Details
router.put('/:id', authMiddleware(getPermissions('HIGH')), validate(SpecificationSchema), updateSingleSpecification);

module.exports = router;
