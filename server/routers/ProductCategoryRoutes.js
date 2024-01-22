const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');

const { getAllProductCategorys, postSingleProductCategory, getSingleProductCategory, deleteSingleProductCategory, updateSingleProductCategory } = require('../controllers/ProductCategoryController');

const {CategorySchema} = require('../validators/Schemas');
const validate = require('../validators/validate');


// To get All ProductCategorys list
router.get('/', authMiddleware(getPermissions('HIGH')), getAllProductCategorys);

// To Add a ProductCategory to ProductCategorys list
router.post('/add-category', authMiddleware(getPermissions('HIGH')), validate(CategorySchema), postSingleProductCategory);

// To get Single ProductCategory Details
router.get('/:id', authMiddleware(getPermissions('HIGH')), getSingleProductCategory);

// To Delete Single ProductCategory Details
router.delete('/:id', authMiddleware(getPermissions('HIGH')), deleteSingleProductCategory);

// To Update a Single ProductCategory Details
router.put('/:id', authMiddleware(getPermissions('HIGH')), validate(CategorySchema), updateSingleProductCategory);


module.exports = router;
