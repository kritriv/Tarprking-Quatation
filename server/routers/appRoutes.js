const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');
const { hasPermissions } = require('../modules/permission');
const { uploadImg } = require('../middlewares/multer');
const validate = require('../validators/validate');

// Function to dynamically generate routes
function generateRoutes(entity, controller, schema) {
    const { ListAll, ReadItem, CreateItem, RemoveItem, UpdateItem, Upload } = controller;
    router.get(`/${entity}/`, authMiddleware(hasPermissions('LOW')), ListAll);
    router.get(`/${entity}/:id`, authMiddleware(hasPermissions('LOW')), ReadItem);
    router.post(`/${entity}/add`, authMiddleware(hasPermissions('MEDIUM')), validate(schema), CreateItem);
    router.delete(`/${entity}/:id`, authMiddleware(hasPermissions('HIGH')), RemoveItem);
    router.put(`/${entity}/:id`, authMiddleware(hasPermissions('MEDIUM')), validate(schema), UpdateItem);

    if (Upload) {
        router.put(`/${entity}/upload-image/:id`, authMiddleware(hasPermissions('MEDIUM')), uploadImg, Upload);
    }
}

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

// Import controllers and schemas
const controllers = {
    user: require('../controllers/User'),
    client: require('../controllers/Client'),
    ourCompany: require('../controllers/Company'),
    productCategory: require('../controllers/Category'),
    product: require('../controllers/Product'),
    subProduct: require('../controllers/SubProduct'),
    specification: require('../controllers/Specification'),
    termAndCondition: require('../controllers/TermAndCondition'),
    quotation: require('../controllers/Quotation'),
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

// Use the generateRoutes function with the controllers and Validators schemas
generateRoutes(entities.user, controllers.user, schemas.user);
generateRoutes(entities.client, controllers.client, schemas.client);
generateRoutes(entities.ourCompany, controllers.ourCompany, schemas.ourCompany);
generateRoutes(entities.productCategory, controllers.productCategory, schemas.productCategory);
generateRoutes(entities.product, controllers.product, schemas.product);
generateRoutes(entities.subProduct, controllers.subProduct, schemas.subProduct);
generateRoutes(entities.specification, controllers.specification, schemas.specification);
generateRoutes(entities.termAndCondition, controllers.termAndCondition, schemas.termAndCondition);
generateRoutes(entities.quotation, controllers.quotation, schemas.quotation);

module.exports = router;
