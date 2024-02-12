const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');

const { RegisterSchema, LoginSchema } = require('../validators/Schemas');
const validate = require('../validators/validate');

router.post('/register', validate(RegisterSchema), register);
router.post('/login', validate(LoginSchema), login);
router.post('/logout', logout);

module.exports = router;
