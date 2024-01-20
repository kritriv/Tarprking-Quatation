const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');

const { getAllProductCategorys, postSingleProductCategory, getSingleProductCategory, deleteSingleProductCategory, updateSingleProductCategory } = require('../controllers/ProductCategoryController');

router.get('/', authMiddleware(['USER', 'ADMIN', 'SUPERADMIN']), async (req, res) => {
    return res.send('This is user routes');
});

// To get All ProductCategorys list
router.get('/categorys', getAllProductCategorys);

// To Add a ProductCategory to ProductCategorys list
router.post('/categorys/add-category', postSingleProductCategory);

// To get Single ProductCategory Details
router.get('/categorys/:id', getSingleProductCategory);

// To Delete Single ProductCategory Details
router.delete('/categorys/:id', deleteSingleProductCategory);

// To Update a Single ProductCategory Details
router.put('/categorys/:id', updateSingleProductCategory);


module.exports = router;
