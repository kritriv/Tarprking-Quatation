const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');

router.get('/', authMiddleware(['SUPERADMIN']), async (req, res) => {
    return res.send('This is Super Admin routes');
});

module.exports = router;
