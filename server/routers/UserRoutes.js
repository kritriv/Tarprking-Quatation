const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth');


router.get("/",authMiddleware(["user", "admin", "super_admin"]) ,async (req, res)=>{
    return res.send("This is user routes")
})


module.exports = router;