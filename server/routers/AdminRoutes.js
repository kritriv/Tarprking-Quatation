const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');

router.get('/', authMiddleware(['ADMIN', 'SUPERADMIN']), async (req, res) => {
    return res.send('This is Admin routes');
});

module.exports = router;
