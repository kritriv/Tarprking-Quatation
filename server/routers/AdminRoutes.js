const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');

router.get('/', authMiddleware(getPermissions('ADMIN')), async (req, res) => {
  return res.send('This is Admin routes');
});

module.exports = router;
