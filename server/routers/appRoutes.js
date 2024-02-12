const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');
const { getPermissions } = require('../modules/permission');
const { uploadImg } = require('../middlewares/multer');
const validate = require('../validators/validate');

// Function to dynamically generate routes
function generateRoutes(entity, controller, schema, permissions) {
    const { ListAll, ReadItem, CreateItem, RemoveItem, UpdateItem, Upload } = controller;
    router.get(`/${entity}/`, authMiddleware(getPermissions(permissions)), ListAll);
    router.get(`/${entity}/:id`, authMiddleware(getPermissions(permissions)), ReadItem);
    router.post(`/${entity}/add`, authMiddleware(getPermissions(permissions)), validate(schema), CreateItem);
    router.delete(`/${entity}/:id  `, authMiddleware(getPermissions(permissions)), RemoveItem);
    router.put(`/${entity}/:id`, authMiddleware(getPermissions(permissions)), validate(schema), UpdateItem);

    if (Upload) {
        router.put(`/${entity}/upload-image/:id`, authMiddleware(getPermissions(permissions)), uploadImg, Upload);
    }
}

// Import controllers and schemas
const controllers = {
    user: require('../controllers/UserController'),
    client: require('../controllers/ClientController'),
    ourCompany: require('../controllers/OurCompanyController'),
    productCategory: require('../controllers/ProductCategoryController'),
    product: require('../controllers/ProductController'),
    subProduct: require('../controllers/SubProductController'),
    specification: require('../controllers/SpecificationController'),
    termAndCondition: require('../controllers/TermAndConditionController'),
    quotation: require('../controllers/QuotationController'),
};

const schemas = {
    user: require('../validators/Schemas').Userschema,
    client: require('../validators/Schemas').ClientSchema,
    ourCompany: require('../validators/Schemas').OurCompanySchema,
    productCategory: require('../validators/Schemas').CategorySchema,
    product: require('../validators/Schemas').productSchema,
    subProduct: require('../validators/Schemas').SubProductSchema,
    specification: require('../validators/Schemas').SpecificationSchema,
    termAndCondition: require('../validators/Schemas').TermAndConditionSchema,
    quotation: require('../validators/Schemas').QuoteSchema,
};

const entities = {
    user: 'users',
    client: 'clients',
    ourCompany: 'company-details',
    productCategory: 'categories',
    product: 'products',
    subProduct: 'subproducts',
    specification: 'specifications',
    termAndCondition: 'terms-conditions',
    quotation: 'quotes',
};

// Use the generateRoutes function with the controllers and schemas
generateRoutes(entities.user, controllers.user, schemas.user, 'MEDIUM');
generateRoutes(entities.client, controllers.client, schemas.client, 'MEDIUM');
generateRoutes(entities.ourCompany, controllers.ourCompany, schemas.ourCompany, 'HIGH');
generateRoutes(entities.productCategory, controllers.productCategory, schemas.productCategory, 'HIGH');
generateRoutes(entities.product, controllers.product, schemas.product, 'HIGH');
generateRoutes(entities.subProduct, controllers.subProduct, schemas.subProduct, 'HIGH');
generateRoutes(entities.specification, controllers.specification, schemas.specification, 'HIGH');
generateRoutes(entities.termAndCondition, controllers.termAndCondition, schemas.termAndCondition, 'HIGH');
generateRoutes(entities.quotation, controllers.quotation, schemas.quotation, 'MEDIUM');

module.exports = router;
