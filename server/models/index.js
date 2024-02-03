const { userSchema } = require('./UserModel');
const { ClientSchema } = require('./ClientModel');
const { ProductCategorySchema } = require('./ProductCategoryModel');
const { ProductSchema } = require('./ProductModel');
const { SubProductSchema } = require('./SubProductModel');
const { SpecificationSchema } = require('./SpecificationModel');
const { quoteSchema } = require('./QuoteModel');

module.exports = { userSchema, ClientSchema, ProductCategorySchema, ProductSchema, SubProductSchema, SpecificationSchema, quoteSchema};
