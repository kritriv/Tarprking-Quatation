const z = require('zod');

const OurCompanySchema = z.object({
    name: z
        .string({
            required_error: 'Company Name must be provided.',
            invalid_type_error: 'Company Name must be a string.',
        })
        .min(1, { message: 'Company Name cannot be empty.' })
        .min(5, { message: 'Company Name must be greater than 5 char' })
        .max(255, { message: 'Company Name cannot be more than 255 characters.' }),

    emails: z
        .array(z.string({ invalid_type_error: 'Email must be a string.' }))
        .refine((value) => value.length > 0, { message: 'Emails are required.' })
        .optional(),

    websites: z
        .array(z.string({ invalid_type_error: 'Website must be a string.' }))
        .refine((value) => value.length > 0, { message: 'Websites are required.' })
        .optional(),

    phones: z
        .array(z.string({ invalid_type_error: 'Phone must be a string.' }))
        .refine((value) => value.length > 0, { message: 'Phones are required.' })
        .optional(),

    cin_no: z
        .string({ invalid_type_error: 'CIN must be a string.' })
        .refine((value) => value.length > 0, { message: 'CIN is required.' })
        ,

    tan_no: z
        .string({ invalid_type_error: 'TAN must be a string.' })
        .refine((value) => value.length > 0, { message: 'TAN is required.' })
        .optional(),

    pan_no: z
        .string({ invalid_type_error: 'PAN must be a string.' })
        .refine((value) => value.length > 0, { message: 'PAN is required.' })
        .optional(),

    gst_no: z
        .string({ invalid_type_error: 'GST must be a string.' })
        .refine((value) => value.length > 0, { message: 'GST is required.' })
        .optional(),

    address: z
        .object({
            office: z.string({ invalid_type_error: 'Office address must be a string.' }).optional(),
            factory: z.string({ invalid_type_error: 'Factory address must be a string.' }).optional(),
        })
        .optional(),

    bank_details: z
        .object({
            bank_name: z.string({ invalid_type_error: 'Bank Name must be a string.' }).optional(),
            account_no: z.string({ invalid_type_error: 'Account Number must be a string.' }).optional(),
            ifsc: z.string({ invalid_type_error: 'IFSC Code must be a string.' }).optional(),
            branch: z.string({ invalid_type_error: 'Branch must be a string.' }).optional(),
        })
        .optional(),
});

module.exports = { OurCompanySchema };
