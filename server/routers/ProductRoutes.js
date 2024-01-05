const express = require("express");
const router = express.Router();
const { getAllProducts, getSingleProduct, postSingleProduct, deleteSingleProduct, updateSingleProduct} = require("../controllers/ProductController");

// Middleware to parse JSON bodies
router.use(express.json());

// To get All Products list
router.route("/products").get(getAllProducts);

// To get Single Product Details
router.route("/products/:id").get(getSingleProduct);

// To Add a Product to Products list
router.route("/products/add-product").post(postSingleProduct);

// To Delete Single Product Details
router.route("/products/:id").delete(deleteSingleProduct);

// To Update a Single Product Details
router.route("/products/:id").put(updateSingleProduct);

module.exports = router;