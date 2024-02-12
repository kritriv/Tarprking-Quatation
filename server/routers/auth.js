const express = require('express');
const router = express.Router();
const { Register, Login, Logout } = require('../controllers/Auth');

const { RegisterSchema, LoginSchema } = require('../validators/Schemas');
const validate = require('../validators/validate');

router.post('/register', validate(RegisterSchema), Register);
router.post('/login', validate(LoginSchema), Login);
router.post('/logout', Logout);

module.exports = router;
