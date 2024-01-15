const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth');


router.get("/", authMiddleware(["admin", "super_admin"]) ,async (req, res)=>{
    return res.send("This is Admin routes")
})

module.exports = router;