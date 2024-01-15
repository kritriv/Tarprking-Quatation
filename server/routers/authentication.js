const express = require('express');
const router = express.Router();
const { signin, signup } = require('../controllers/authController');

const {signupSchema, signinSchema} = require("../validators/auth_validator");
const validate = require("../middlewares/Validate_middleware");

router.post('/register', validate(signupSchema), signup);
router.post("/login", validate(signinSchema), signin)

module.exports = router;