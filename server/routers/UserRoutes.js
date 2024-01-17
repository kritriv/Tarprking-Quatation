const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth');

const { getAllUsers,postSingleUser, getSingleUser, deleteSingleUser, updateSingleUser} = require("../controllers/UserController");
const { getAllQuotes, createQuote, getSingleQuote , deleteSingleQuote, updateSingleQuote} = require("../controllers/QuotationController/QuotationController");

// const { createQuote} = require("../controllers/QuotationController/QuotationController");


router.get("/",authMiddleware(["user", "admin", "super_admin"]) ,async (req, res)=>{
    return res.send("This is user routes")
});


// To get All Users list
router.route("/users").get(getAllUsers);

// To Add a User to Users list
router.route("/users/add-user").post(postSingleUser);

// To get Single User Details
router.route("/users/:id").get(getSingleUser);

// To Delete Single User Details
router.route("/users/:id").delete(deleteSingleUser);

// To Update a Single User Details
router.route("/users/:id").put(updateSingleUser);




// To get All Quotes list
router.get("/Quotes", getAllQuotes);

// To get Single Quote Details
router.get("/Quotes/:id", getSingleQuote);

// To Add a Quote to Quotes list
router.post("/Quotes/add-Quote", createQuote);

// To Delete Single Quote Details
router.delete("/Quotes/:id", deleteSingleQuote);

// To Update a Single Quote Details
router.put("/Quotes/:id", updateSingleQuote);




module.exports = router;