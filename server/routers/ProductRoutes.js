const express = require("express");
const router = express.Router();
const { getAllProducts, getSingleProduct, postSingleProduct, deleteSingleProduct, updateSingleProduct} = require("../controllers/ProductController");

const productSchema= require('../validators/ProductValidate');
const validate = require('../middlewares/Validate_middleware');

// Middleware to parse JSON bodies
router.use(express.json());

// To get All Products list
router.get("/products", getAllProducts);

// To get Single Product Details
router.get("/products/:id", getSingleProduct);

// To Add a Product to Products list
router.post("/products/add-product", validate(productSchema), postSingleProduct);

// To Delete Single Product Details
router.delete("/products/:id", deleteSingleProduct);

// To Update a Single Product Details
router.put("/products/:id", updateSingleProduct);

module.exports = router;