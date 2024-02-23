const z = require('zod');

const ClientSchema = z.object({
    status: z
        .boolean({
            invalid_type_error: 'Client Status must be a boolean',
        })
        .optional(),

    username: z
        .string({
            invalid_type_error: 'Username must be a String',
            required_error: 'Username must be required!',
        })
        .min(1, { message: 'Username cannot be empty.' })
        .min(5, { message: 'Username must be at least 5 characters.' })
        .max(16, { message: 'Username cannot be more than 16 characters.' }),

    createdby: z
        .string()
        .refine((value) => value.length === 24, {
            message: 'Invalid ObjectId for Createdby',
        })
        .optional(),

    name: z
        .string({
            invalid_type_error: 'Client Name must be a String',
        })
        .min(1, { message: 'Name cannot be empty.' })
        .min(3, { message: 'Name must be at least 3 characters.' })
        .max(100, { message: 'Name cannot be more than 100 characters.' })
        .optional(),

    email: z
        .string({
            invalid_type_error: 'Email must be a Valid',
        })
        .min(1, { message: 'Email cannot be empty.' })
        .email({ message: 'Invalid email format!' })
        .optional(),

    phone: z
        .string({
            invalid_type_error: 'Contact number must be a string',
        })
        .min(1, { message: 'Contact number cannot be empty.' })
        .min(9, { message: 'Contact number must be at least 9 characters.' })
        .max(11, { message: 'Contact number cannot be more than 11 characters.' })
        .optional(),

    company: z
        .string({
            invalid_type_error: 'Company Name must be a String',
        })
        .min(1, { message: 'Company Name cannot be empty.' })
        .min(3, { message: 'Company Name must be at least 3 characters.' })
        .max(200, { message: 'Company Name cannot be more than 200 characters.' })
        .optional(),

    gst: z
        .string({
            invalid_type_error: 'Company GST No must be a String',
        })
        .min(1, { message: 'GST number must be provided.' })
        .min(14, { message: 'GST number must be 15 characters.' })
        .max(15, { message: 'GST number must not exceed 15 characters.' })
        .optional(),

    address: z
        .object({
            site: z
                .string({
                    invalid_type_error: 'Site must be a String',
                })
                .min(1, { message: 'Site cannot be empty.' })
                .min(3, { message: 'Site must be at least 3 characters.' })
                .max(200, { message: 'Site cannot be more than 200 characters.' })
                .optional(),

            street: z
                .string({
                    invalid_type_error: 'Street must be a String',
                })
                .min(1, { message: 'Street cannot be empty.' })
                .min(3, { message: 'Street must be at least 3 characters.' })
                .max(200, { message: 'Street cannot be more than 200 characters.' })
                .optional(),

            city: z
                .string({
                    invalid_type_error: 'City must be a String',
                })
                .min(1, { message: 'City cannot be empty.' })
                .min(3, { message: 'City must be at least 3 characters.' })
                .max(50, { message: 'City cannot be more than 50 characters.' })
                .optional(),

            state: z
                .string({
                    invalid_type_error: 'State must be a String',
                })
                .min(1, { message: 'State cannot be empty.' })
                .min(3, { message: 'State must be at least 3 characters.' })
                .max(50, { message: 'State cannot be more than 50 characters.' })
                .optional(),

            pincode: z
                .number({
                    invalid_type_error: 'Pincode must be a number',
                })
                .min(1, { message: 'Pincode cannot be empty.' })
                .min(5, { message: 'Pincode must be 5 characters.' })
                .optional(),

            country: z
                .string({
                    invalid_type_error: 'Country must be a String',
                })
                .min(1, { message: 'Country cannot be empty.' })
                .min(3, { message: 'Country must be at least 3 characters.' })
                .max(50, { message: 'Country cannot be more than 50 characters.' })
                .optional(),
        })
        .optional(),
});

module.exports = { ClientSchema };
