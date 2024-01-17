const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

const {RegisterSchema, LoginSchema} = require("../validators/auth_validator");
const validate = require("../middlewares/Validate_middleware");

router.post('/register', validate(RegisterSchema), register);
router.post("/login", validate(LoginSchema), login)

module.exports = router;