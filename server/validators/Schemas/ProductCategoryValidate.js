const z = require('zod');

const CategorySchema = z.object({
    status: z
        .boolean({
            invalid_type_error: 'Category Status must be a boolean',
        })
        .optional(),

    createdby: z
        .string()
        .refine((value) => value.length === 24, {
            message: 'Invalid ObjectId for Createdby',
        })
        .optional(),

    name: z
        .string({
            invalid_type_error: 'Category Name must be a String',
            required_error: 'Category Name must be required!',
        })
        .min(1, { message: 'Category Name cannot be empty.' })
        .min(5, { message: 'Category Name must be at least 5 characters.' })
        .max(16, { message: 'Category Name cannot be more than 16 characters.' }),

    description: z
        .string({
            invalid_type_error: 'Category Description must be a String',
        })
        .min(1, { message: 'Category Description cannot be empty.' })
        .min(10, { message: 'Category Description must be at least 10 characters.' })
        .max(100, { message: 'Category Description cannot be more than 100 characters.' })
        .optional(),

    products: z
        .array(
            z.string().refine((value) => value.length === 24, {
                message: 'Invalid ObjectId for sub_product',
            }),
        )
        .optional(),
});

module.exports = { CategorySchema };
