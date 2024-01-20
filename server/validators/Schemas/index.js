const { idSchema } = require('./IdValidate');
const { RegisterSchema, LoginSchema } = require('./AuthValidator');
const { Userschema } = require('./UserValidate');
const { ClientSchema } = require('./ClientValidate');
const { CetegorySchema } = require('./ProductCategoryValidator');
const { productSchema } = require('./ProductValidate');

module.exports = { idSchema, RegisterSchema, LoginSchema , Userschema, ClientSchema, CetegorySchema, productSchema};
