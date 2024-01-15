const z = require('zod');

const productSchema = z.object({
    
    product_id: z
        .string({
            required_error: 'Product Id must be required!',
            invalid_type_error: 'Product Id must be a String',
        })
        .min(1, { message: 'Product Id cannot be empty.' })
        .min(3, { message: 'Product Id must be at least 3 characters.' })
        .max(8, { message: 'Product Id cannot be more than 8 characters.' }),

    product_HSN: z
        .string({
            required_error: 'Product HSN must be required!',
            invalid_type_error: 'Product HSN must be a String',
        })
        .min(1, { message: 'Product HSN cannot be empty.' })
        .min(3, { message: 'Product HSN must be at least 3 characters.' })
        .max(8, { message: 'Product HSN cannot be more than 8 characters.' }),

    product_status: z.boolean({
        invalid_type_error: 'Product Status must be a boolean',
    }),

    admin_create_username: z
        .string({
            invalid_type_error: 'Create Admin must be a String',
        })
        .min(1, { message: 'Create Admin cannot be empty.' })
        .min(3, { message: 'Create Admin must be at least 3 characters.' })
        .max(16, { message: 'Create Admin cannot be more than 16 characters.' }),
    
    product_name: z
        .string({
            required_error: 'Product Name must be required!',
            invalid_type_error: 'Product Name must be a String',
        })
        .min(1, { message: 'Product Name cannot be empty.' })
        .min(3, { message: 'Product Name must be at least 3 characters.' })
        .max(200, { message: 'Product Name cannot be more than 200 characters.' }),
    
    product_description: z
        .string({
            required_error: 'Product description must be required!',
            invalid_type_error: 'Product description must be a String',
        })
        .min(1, { message: 'Product description cannot be empty.' })
        .min(3, { message: 'Product description must be at least 3 characters.' })
        .max(200, { message: 'Product description cannot be more than 200 characters.' }),
    
    sub_type: z
        .string({
            invalid_type_error: 'Product Sub-type must be a String',
        })
        .max(200, { message: 'Product Sub-type cannot be more than 200 characters.' }),
   
    basic_rate: z
        .number({
            invalid_type_error: 'Product Basic Rate must be a Number',
        }),
    
    installation_charges: z
        .number({
            invalid_type_error: 'Product Installation Charge must be a Number',
        }),
    
    total_price: z
        .number({
            invalid_type_error: 'Product Total Price must be a Number',
        }),

});

module.exports = productSchema;
