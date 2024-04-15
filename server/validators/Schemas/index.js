const { idSchema } = require('./IdValidate');
const { RegisterSchema, LoginSchema } = require('./AuthValidate');
const { Userschema } = require('./UserValidate');
const { ClientSchema } = require('./ClientValidate');
const { LeadSchema } = require('./LeadValidate');
const { CategorySchema } = require('./ProductCategoryValidate');
const { productSchema } = require('./ProductValidate');
const { SubProductSchema } = require('./SubProductValidate');
const { SpecificationSchema } = require('./SpecificationValidate');
const { OurCompanySchema } = require('./OurCompanyValidate');
const { TermAndConditionSchema } = require('./TermAndConditionValidate');
const { QuoteSchema } = require('./QuoteValidate');
const { Quote2Schema } = require('./Quote2Validate');

module.exports = { idSchema, RegisterSchema, LoginSchema, Userschema, ClientSchema, LeadSchema, CategorySchema, productSchema, SubProductSchema, SpecificationSchema, OurCompanySchema , TermAndConditionSchema, QuoteSchema, Quote2Schema};
