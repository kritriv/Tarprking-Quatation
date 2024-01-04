const express = require("express");
const router = express.Router();
const { getAllProducts} = require("../controllers/ProductController");

// Middleware to parse JSON bodies
router.use(express.json());

// To get All Products list
router.route("/products").get(getAllProducts);

module.exports = router;