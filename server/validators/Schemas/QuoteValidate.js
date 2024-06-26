const z = require('zod');

const QuoteSchema = z.object({
    refno: z
        .string({
            required_error: 'Quote Ref No must be required!',
            invalid_type_error: 'Quote Ref No must be a String',
        })
        .min(1, { message: 'Quote Ref No cannot be empty.' })
        .min(3, { message: 'Quote Ref No must be at least 3 characters.' })
        .max(100, { message: 'Quote Ref No cannot be more than 100 characters.' }),

    createdby: z
        .string()
        .refine((value) => value.length === 24, {
            message: 'Invalid ObjectId for Createdby',
        })
        .optional(),

    client: z
        .string()
        .refine((value) => value.length === 24, {
            message: 'Invalid ObjectId for client',
        })
        .optional(),

    year: z
        .number({ invalid_type_error: 'Year must be a Number' })
        .refine((value) => value.length === 4, {
            message: 'year must be valid of 4 char',
        })
        .optional(),

    date: z
        .string({
            invalid_type_error: 'Date must be a String',
        })
        .optional(),

    expired_date: z
        .string({
            invalid_type_error: 'Expiry Date must be a String',
        })
        .optional(),

    subject: z
        .string({
            invalid_type_error: 'Subject must be a String',
        })
        .min(1, { message: 'Subject cannot be empty.' })
        .min(3, { message: 'Subject must be at least 3 characters.' })
        .max(200, { message: 'Subject cannot be more than 200 characters.' })
        .optional(),

    greeting: z
        .string({
            invalid_type_error: 'Greeting must be a String',
        })
        .min(1, { message: 'Greeting cannot be empty.' })
        .min(3, { message: 'Greeting must be at least 3 characters.' })
        .max(200, { message: 'Greeting cannot be more than 200 characters.' })
        .optional(),

    proposal_title: z
        .string({
            invalid_type_error: 'Proposal Title must be a String',
        })
        .min(1, { message: 'Proposal Title cannot be empty.' })
        .min(3, { message: 'Proposal Title must be at least 3 characters.' })
        .max(200, { message: 'Proposal Title cannot be more than 200 characters.' })
        .optional(),

    item: z
        .string()
        .refine((value) => value.length === 24, {
            message: 'Invalid ObjectId for item product',
        })
        .optional(),

    quote_price: z
        .object({
            quantity: z
                .number({
                    invalid_type_error: 'Quantity must be a Number',
                })
                .optional(),
            item_sub_total: z
                .number({
                    invalid_type_error: 'Item Sub Total must be a Number',
                })
                .optional(),
            freight_cost: z
                .number({
                    invalid_type_error: 'Freight Cost must be a Number',
                })
                .optional(),
            unloading_cost: z
                .number({
                    invalid_type_error: 'Unloading Cost must be a Number',
                })
                .optional(),
            transport_charge: z
                .number({
                    invalid_type_error: 'Transport Charge must be a Number',
                })
                .optional(),
            tax_rate: z
                .number({
                    invalid_type_error: 'Tax Rate must be a Number',
                })
                .optional(),
            taxtotal: z
                .number({
                    invalid_type_error: 'Taxtotal must be a Number',
                })
                .optional(),
            discount: z
                .number({
                    invalid_type_error: 'Discount must be a Number',
                })
                .optional(),
            total_price: z
                .number({
                    invalid_type_error: 'Total Price must be a Number',
                })
                .optional(),
        })
        .optional(),

    remark: z
        .string({
            invalid_type_error: 'Remark must be a String',
        })
        .min(1, { message: 'Remark cannot be empty.' })
        .min(3, { message: 'Remark must be at least 3 characters.' })
        .max(200, { message: 'Remark cannot be more than 200 characters.' })
        .optional(),

    status: z
        .string()
        .refine((value) => ['pending', 'sent', 'accepted', 'cancelled', 'on hold'].includes(value.toLowerCase()), {
            message: 'Invalid Status provided!',
        })
        .optional(),

    approved: z
        .boolean({
            invalid_type_error: 'Approved must be a boolean',
        })
        .optional(),

    expired: z
        .boolean({
            invalid_type_error: 'Expired Status must be a boolean',
        })
        .optional(),

    back_image: z.string({ invalid_type_error: 'quoate Back Image must be a String' }).optional(),
});

module.exports = { QuoteSchema };
