const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');
const { uploadImg } = require('../middlewares/multer');
const { getAllSubProducts, postSingleSubProduct, getSingleSubProduct, deleteSingleSubProduct, updateSingleSubProduct, UploadSubProductImg } = require('../controllers/SubProductController');

const { SubProductSchema } = require('../validators/Schemas');
const validate = require('../validators/validate');

// To get All SubProducts list
router.get('/', authMiddleware(getPermissions('HIGH')), getAllSubProducts);

// To Add a SubProduct to SubProducts list
router.post('/add-subproduct', authMiddleware(getPermissions('HIGH')), validate(SubProductSchema), postSingleSubProduct);

// To get Single SubProduct Details
router.get('/:id', authMiddleware(getPermissions('HIGH')), getSingleSubProduct);

// To Delete Single SubProduct Details
router.delete('/:id', authMiddleware(getPermissions('HIGH')), deleteSingleSubProduct);

// To Update a Single SubProduct Details
router.put('/:id', authMiddleware(getPermissions('HIGH')), validate(SubProductSchema), updateSingleSubProduct);

// To Add a Images of SubProduct 
router.put('/upload-image/:id', authMiddleware(getPermissions('HIGH')), uploadImg,  UploadSubProductImg);

module.exports = router;
