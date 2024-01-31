const z = require('zod');

const productSchema = z.object({
    product_status: z
        .boolean({
            invalid_type_error: 'Product Status must be a boolean',
        })
        .optional(),

    createdby: z
        .string({
            invalid_type_error: 'Created By must be a String',
        })
        .optional(),

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

    category: z
        .string()
        .refine((value) => value.length === 24, {
            message: 'Invalid ObjectId for Category',
        })
        .optional(),

    sub_products: z
        .array(
            z.string().refine((value) => value.length === 24, {
                message: 'Invalid ObjectId for sub_product',
            }),
        )
        .optional(),
});

module.exports = { productSchema };
