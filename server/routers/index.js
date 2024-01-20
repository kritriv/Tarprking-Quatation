const express = require('express');
const router = express.Router();

// Import individual route files
const userAuth = require('./authentication');
const userRoutes = require('./UserRoutes');
const clientRoutes = require('./ClientRoutes');
const productRoutes = require('./ProductRoutes');
const productCategoryRoutes = require('./ProductCategoryRoutes');
const quotationRoutes = require('./QuotationRoute');

// Mount individual route files
router.use('/', userAuth);
router.use('/users', userRoutes);
router.use('/clients', clientRoutes);
router.use('/products', productRoutes);
router.use('/categories', productCategoryRoutes);
router.use('/quotes', quotationRoutes);

module.exports = router;
