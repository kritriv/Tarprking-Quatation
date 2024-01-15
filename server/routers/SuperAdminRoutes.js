const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/auth');

router.get("/",authMiddleware(["super_admin"]) ,async (req, res)=>{
    return res.send("This is Super Admin routes")
})


module.exports = router;