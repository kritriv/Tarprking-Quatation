const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');

const { RegisterSchema, LoginSchema } = require('../validators/auth_validator');
const validate = require('../validators/validate');

router.get('/', authMiddleware(getPermissions('USER')), async (req, res) => {
    return res.send('This is user routes');
  });

router.post('/register', validate(RegisterSchema), register);
router.post('/login', validate(LoginSchema), login);

module.exports = router;
