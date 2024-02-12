const express = require('express');
const router = express.Router();

// Define route configurations
const routeConfigurations = [
    { path: '/', route: require('./authentication') },
    { path: '/users', route: require('./UserRoutes') },
    { path: '/clients', route: require('./ClientRoutes') },
    { path: '/categories', route: require('./ProductCategoryRoutes') },
    { path: '/products', route: require('./ProductRoutes') },
    { path: '/subproducts', route: require('./SubProductRoutes') },
    { path: '/specifications', route: require('./SpecificationRoutes') },
    { path: '/company-details', route: require('./OurCompanyRoutes') },
    { path: '/terms-conditions', route: require('./TermAndConditionRoutes') },
    { path: '/quotes', route: require('./QuotationRoute') },
];

// Dynamically mount routes
routeConfigurations.forEach(({ path, route }) => {
    router.use(path, route);
});

module.exports = router;
