const express = require('express');
const router = express.Router();

// Import individual route files
const userAuth = require('./authentication');
const userRoutes = require('./UserRoutes');
const clientRoutes = require('./ClientRoutes');
const productCategoryRoutes = require('./ProductCategoryRoutes');
const productRoutes = require('./ProductRoutes');
const subProductRoutes = require('./SubProductRoutes');
const quotationRoutes = require('./QuotationRoute');

// Mount individual route files
router.use('/', userAuth);
router.use('/users', userRoutes);
router.use('/clients', clientRoutes);
router.use('/categories', productCategoryRoutes);
router.use('/products', productRoutes);
router.use('/subproducts', subProductRoutes);
router.use('/quotes', quotationRoutes);

module.exports = router;
