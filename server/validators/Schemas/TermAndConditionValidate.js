const z = require('zod');

const TermAndConditionSchema = z.object({
    sub_product: z.string({ required_error: 'Sub Product Id must be required!' }).refine((value) => value.length === 24, {
        message: 'Sub Product Id must be valid of 24 char',
    }),
    prices: z
        .string({
            invalid_type_error: 'Prices must be a string.',
        })
        .min(1, { message: 'Prices cannot be empty.' })
        .max(2500, { message: 'Prices cannot be more than 2500 characters.' })
        .optional(),

    payment_terms: z
        .array(
            z
                .string({
                    invalid_type_error: 'Payment Term must be a string.',
                })
                .min(1, { message: 'Payment Term cannot be empty.' })
                .max(2500, { message: 'Payment Term cannot be more than 2500 characters.' }),
        )
        .refine((value) => value.length > 0, { message: 'At least one payment term must be provided.' })
        .optional(),

    packing_forwarding: z
        .string({
            invalid_type_error: 'Packing and Forwarding must be a string.',
        })
        .min(1, { message: 'Packing and Forwarding cannot be empty.' })
        .max(2500, { message: 'Packing and Forwarding cannot be more than 2500 characters.' })
        .optional(),

    client_responsibilities: z
        .array(
            z
                .string({
                    invalid_type_error: 'Client Responsibility must be a string.',
                })
                .min(1, { message: 'Client Responsibility cannot be empty.' })
                .max(2500, { message: 'Client Responsibility cannot be more than 2500 characters.' }),
        )
        .refine((value) => value.length > 0, { message: 'At least one client responsibility must be provided.' })
        .optional(),

    material_delivery: z
        .string({
            invalid_type_error: 'Material Delivery must be a string.',
        })
        .min(1, { message: 'Material Delivery cannot be empty.' })
        .max(2500, { message: 'Material Delivery cannot be more than 2500 characters.' })
        .optional(),

    installation_process: z
        .array(
            z
                .string({
                    invalid_type_error: 'Installation Process step must be a string.',
                })
                .min(1, { message: 'Installation Process step cannot be empty.' })
                .max(2500, { message: 'Installation Process step cannot be more than 2500 characters.' }),
        )
        .refine((value) => value.length > 0, { message: 'At least one installation process step must be provided.' })
        .optional(),

    operation: z
        .string({
            invalid_type_error: 'Operation must be a string.',
        })
        .min(1, { message: 'Operation cannot be empty.' })
        .max(2500, { message: 'Operation cannot be more than 2500 characters.' })
        .optional(),

    force_majeure: z
        .string({
            invalid_type_error: 'Force Majeure must be a string.',
        })
        .min(1, { message: 'Force Majeure cannot be empty.' })
        .max(2500, { message: 'Force Majeure cannot be more than 2500 characters.' })
        .optional(),

    warranty: z
        .string({
            invalid_type_error: 'Warranty must be a string.',
        })
        .min(1, { message: 'Warranty cannot be empty.' })
        .max(2500, { message: 'Warranty cannot be more than 2500 characters.' })
        .optional(),

    termination: z
        .string({
            invalid_type_error: 'Termination must be a string.',
        })
        .min(1, { message: 'Termination cannot be empty.' })
        .max(2500, { message: 'Termination cannot be more than 2500 characters.' })
        .optional(),

    jurisdiction: z
        .string({
            invalid_type_error: 'Jurisdiction must be a string.',
        })
        .min(1, { message: 'Jurisdiction cannot be empty.' })
        .max(2500, { message: 'Jurisdiction cannot be more than 2500 characters.' })
        .optional(),

    validity: z
        .string({
            invalid_type_error: 'Validity must be a string.',
        })
        .min(1, { message: 'Validity cannot be empty.' })
        .max(2500, { message: 'Validity cannot be more than 2500 characters.' })
        .optional(),
});

module.exports = { TermAndConditionSchema };
