const express = require('express');
const router = express.Router();
const { Register, Login, Logout } = require('../controllers/Auth');

const { RegisterSchema, LoginSchema } = require('../validators/Schemas');
const validate = require('../validators/validate');

router.post('auth/register', validate(RegisterSchema), Register);
router.post('auth/login', validate(LoginSchema), Login);
router.post('auth/logout', Logout);

module.exports = router;
