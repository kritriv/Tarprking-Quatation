const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');

const { getAllProducts, getSingleProduct, postSingleProduct, deleteSingleProduct, updateSingleProduct } = require('../controllers/ProductController');

const {productSchema} = require('../validators/Schemas');
const validate = require('../validators/validate');

// Middleware to parse JSON bodies
router.use(express.json());

// To get All Products list
router.get('/', authMiddleware(getPermissions('HIGH')), getAllProducts);

// To get Single Product Details
router.get('/:id', authMiddleware(getPermissions('HIGH')), getSingleProduct);

// To Add a Product to Products list
router.post('/add-product', authMiddleware(getPermissions('HIGH')), validate(productSchema), postSingleProduct);

// To Delete Single Product Details
router.delete('/:id', authMiddleware(getPermissions('HIGH')), deleteSingleProduct);

// To Update a Single Product Details
router.put('/:id', authMiddleware(getPermissions('HIGH')), updateSingleProduct);

module.exports = router;
