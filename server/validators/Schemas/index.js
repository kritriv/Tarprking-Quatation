const { idSchema } = require('./IdValidate');
const { RegisterSchema, LoginSchema } = require('./AuthValidator');
const { Userschema } = require('./UserValidate');
const { ClientSchema } = require('./ClientValidate');
const { CategorySchema } = require('./ProductCategoryValidator');
const { productSchema } = require('./ProductValidate');
const { SubProductSchema } = require('./SubProductValidators');
const { SpecificationSchema } = require('./SpecificationValidate');
const { OurCompanySchema } = require('./OurCompanyValidate');

module.exports = { idSchema, RegisterSchema, LoginSchema, Userschema, ClientSchema, CategorySchema, productSchema, SubProductSchema, SpecificationSchema, OurCompanySchema };
