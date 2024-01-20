const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');

router.get('/', authMiddleware(getPermissions('SUPERADMIN')), async (req, res) => {
  return res.send('This is Super Admin routes');
});

module.exports = router;
