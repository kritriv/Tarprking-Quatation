const z = require('zod');

const SubProductSchema = z.object({
    status: z
        .boolean({
            invalid_type_error: 'Sub Product Status must be a boolean',
        })
        .optional(),

    model_no: z
        .string({
            required_error: 'Sub Product Model must be required!',
            invalid_type_error: 'Sub Product Model must be a String',
        })
        .min(1, { message: 'Sub Product Model cannot be empty.' })
        .min(3, { message: 'Sub Product Model must be at least 3 characters.' })
        .max(100, { message: 'Sub Product Model cannot be more than 100 characters.' }),

    hsn: z
        .string({
            required_error: 'Product HSN must be required!',
            invalid_type_error: 'Product HSN must be a String',
        })
        .min(1, { message: 'Product HSN cannot be empty.' })
        .min(3, { message: 'Product HSN must be at least 3 characters.' })
        .max(8, { message: 'Product HSN cannot be more than 8 characters.' }),

    createdby: z
        .string()
        .refine((value) => value.length === 24, {
            message: 'Invalid ObjectId for Createdby',
        })
        .optional(),

    name: z
        .string({
            required_error: 'Product Name must be required!',
            invalid_type_error: 'Product Name must be a String',
        })
        .min(1, { message: 'Product Name cannot be empty.' })
        .min(3, { message: 'Product Name must be at least 3 characters.' })
        .max(200, { message: 'Product Name cannot be more than 200 characters.' }),

    description: z
        .string({
            required_error: 'Product description must be required!',
            invalid_type_error: 'Product description must be a String',
        })
        .min(1, { message: 'Product description cannot be empty.' })
        .min(3, { message: 'Product description must be at least 3 characters.' })
        .max(200, { message: 'Product description cannot be more than 200 characters.' }),

    image: z.string({ invalid_type_error: 'Product Image must be a String' }).optional(),

    category: z
        .string()
        .refine((value) => value.length === 24, {
            message: 'Invalid ObjectId for Category',
        })
        .optional(),

    product: z
        .string()
        .refine((value) => value.length === 24, {
            message: 'Invalid ObjectId for product',
        })
        .optional(),

    price: z.object({
        quantity: z.number({
            invalid_type_error: 'Product Quantity must be a Number',
        }),
        basic_rate: z.number({
            invalid_type_error: 'Product Basic Rate must be a Number',
        }),
        installation_charges: z.number({
            invalid_type_error: 'Product Installation Charge must be a Number',
        }),
        subTotal: z.number({
            invalid_type_error: 'Product Subtotal must be a Number',
        }),
    }),

    timings: z.object({
        delivery_time: z.string({
            invalid_type_error: 'Product Delivery time must be a String',
        }),
        installation_time: z.string({
            invalid_type_error: 'Product Delivery time must be a String',
        }),
    }),

    specifications: z
        .string()
        .refine((value) => value.length === 24, {
            message: 'Invalid ObjectId for specifications',
        })
        .optional(),

    tnc: z
        .string()
        .refine((value) => value.length === 24, {
            message: 'Invalid ObjectId for tnc',
        })
        .optional(),
});

module.exports = { SubProductSchema };
