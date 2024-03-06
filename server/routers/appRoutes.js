const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authentication');
const { hasPermissions } = require('../modules/permission');
const { uploadImg } = require('../middlewares/multer');
const validate = require('../validators/validate');

// Function to dynamically generate routes
function generateRoutes(entity, controller, schema) {
    const { ListAll, ReadItem, CreateItem, RemoveItem, UpdateItem, Upload } = controller;
    router.get(`/${entity}s/`,  ListAll);
    // router.get(`/${entity}s/`, authMiddleware(hasPermissions('LOW')), ListAll);
    router.get(`/${entity}/:id`, authMiddleware(hasPermissions('LOW')), ReadItem);
    router.post(`/${entity}/add`, authMiddleware(hasPermissions('MEDIUM')), validate(schema), CreateItem);
    router.delete(`/${entity}/:id`, authMiddleware(hasPermissions('HIGH')), RemoveItem);
    router.put(`/${entity}/:id`, authMiddleware(hasPermissions('MEDIUM')), validate(schema), UpdateItem);

    if (Upload) {
        router.put(`/${entity}/upload-image/:id`, authMiddleware(hasPermissions('MEDIUM')), uploadImg, Upload);
    }
}

const entities = {
    user: 'user',
    client: 'client',
    ourCompany: 'company',
    productCategory: 'category',
    product: 'product',
    subProduct: 'subproduct',
    specification: 'specification',
    termAndCondition: 'tnc',
    quotation: 'quote',
    quotation2: 'quote2',
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
    quotation2: require('../controllers/Quotation2'),
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
    quotation2: require('../validators/Schemas').Quote2Schema,
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
generateRoutes(entities.quotation, controllers.quotation);
generateRoutes(entities.quotation2, controllers.quotation2, schemas.quotation2);

module.exports = router;
