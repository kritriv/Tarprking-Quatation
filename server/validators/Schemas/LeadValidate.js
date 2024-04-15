const z = require('zod');

const LeadSchema = z.object({
    removed: z
        .boolean({
            invalid_type_error: 'Lead removed must be a boolean',
        })
        .optional(),

    type: z
        .string()
        .refine((value) => ['company', 'people'].includes(value.toLowerCase()), {
            message: 'Invalid type provided!',
        })
        .optional(),

    status: z
        .string()
        .refine((value) => ['draft', 'new', 'innegotiate', 'won', 'lose', 'canceled', 'onhold', 'waiting'].includes(value.toLowerCase()), {
            message: 'Invalid status provided!',
        })
        .optional(),

    source: z
        .string()
        .refine((value) => ['linkedin', 'website', 'socialmedia', 'ads', 'friends', 'sales', 'indiamart', 'other'].includes(value.toLowerCase()), {
            message: 'Invalid source provided!',
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

    address: z
        .string({
            invalid_type_error: 'Address must be a String',
        })
        .min(1, { message: 'Address cannot be empty.' })
        .min(3, { message: 'Address must be at least 3 characters.' })
        .max(300, { message: 'Address cannot be more than 300 characters.' })
        .optional(),

    interestedIn: z
        .string()
        .refine((value) => value.length === 24, {
            message: 'Invalid ObjectId for Sub Product',
        })
        .optional(),

});

module.exports = { LeadSchema };
