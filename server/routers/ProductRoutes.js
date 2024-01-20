const express = require('express');
const router = express.Router();
const { getAllProducts, getSingleProduct, postSingleProduct, deleteSingleProduct, updateSingleProduct } = require('../controllers/ProductController');

const productSchema = require('../validators/Schemas/ProductValidate');
const validate = require('../validators/validate');

// Middleware to parse JSON bodies
router.use(express.json());

// To get All Products list
router.get('/', getAllProducts);

// To get Single Product Details
router.get('/:id', getSingleProduct);

// To Add a Product to Products list
router.post('/add-product', validate(productSchema), postSingleProduct);

// To Delete Single Product Details
router.delete('/:id', deleteSingleProduct);

// To Update a Single Product Details
router.put('/:id', updateSingleProduct);

module.exports = router;
