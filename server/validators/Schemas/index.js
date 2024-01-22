const { idSchema } = require('./IdValidate');
const { RegisterSchema, LoginSchema } = require('./AuthValidator');
const { Userschema } = require('./UserValidate');
const { ClientSchema } = require('./ClientValidate');
const { CategorySchema } = require('./ProductCategoryValidator');
const { productSchema } = require('./ProductValidate');

module.exports = { idSchema, RegisterSchema, LoginSchema , Userschema, ClientSchema, CategorySchema, productSchema};
