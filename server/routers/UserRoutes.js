const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth');

const { getAllUsers,postSingleUser, getSingleUser, deleteSingleUser, updateSingleUser} = require("../controllers/UserController");


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


module.exports = router;