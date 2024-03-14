const z = require('zod');

const Quote2Schema = z.object({
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

    ourCompany: z
        .string()
        .refine((value) => value.length === 24, {
            message: 'Invalid ObjectId for ourCompany',
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
        .max(500, { message: 'Subject cannot be more than 500 characters.' })
        .optional(),

    greeting: z
        .string({
            invalid_type_error: 'Greeting must be a String',
        })
        .min(1, { message: 'Greeting cannot be empty.' })
        .min(3, { message: 'Greeting must be at least 3 characters.' })
        .max(500, { message: 'Greeting cannot be more than 500 characters.' })
        .optional(),

    proposal_title: z
        .string({
            invalid_type_error: 'Proposal Title must be a String',
        })
        .min(1, { message: 'Proposal Title cannot be empty.' })
        .min(3, { message: 'Proposal Title must be at least 3 characters.' })
        .max(500, { message: 'Proposal Title cannot be more than 500 characters.' })
        .optional(),

    item: z
        .object({
            id: z
                .string()
                .refine((value) => value.length === 24, {
                    message: 'Invalid ObjectId for Subproduct',
                })
                .optional(),

            categoryName: z
                .string({
                    invalid_type_error: 'Category Name must be a String',
                })
                .min(1, { message: 'Category Name cannot be empty.' })
                .min(3, { message: 'Category Name must be at least 3 characters.' })
                .max(500, { message: 'Category Name cannot be more than 500 characters.' })
                .optional(),

            mainProduct: z
                .string({
                    invalid_type_error: 'Main Product Name must be a String',
                })
                .min(1, { message: 'Main Product Name cannot be empty.' })
                .min(3, { message: 'Main Product Name must be at least 3 characters.' })
                .max(500, { message: 'Main Product Name cannot be more than 500 characters.' })
                .optional(),

            productName: z
                .string({
                    invalid_type_error: 'Product Name must be a String',
                })
                .min(1, { message: 'Product Name cannot be empty.' })
                .min(3, { message: 'Product Name must be at least 3 characters.' })
                .max(500, { message: 'Product Name cannot be more than 500 characters.' })
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
            image: z.string({ invalid_type_error: 'Product Image must be a String' }).optional(),

            specifications: z
                .object({
                    system_module: z
                        .string({
                            invalid_type_error: 'System Module must be a String',
                        })
                        .optional(),

                    system_area: z
                        .string({
                            invalid_type_error: 'System Area must be a String',
                        })
                        .optional(),

                    car_size: z
                        .string({
                            invalid_type_error: 'Car Size must be a String',
                        })
                        .optional(),

                    lifting_capacity: z
                        .string({
                            invalid_type_error: 'Lifting Capacity must be a String',
                        })
                        .optional(),

                    lifting_height: z
                        .object({
                            top: z
                                .number({
                                    invalid_type_error: 'Lifting Top height must be a Number',
                                })
                                .optional(),
                            ground: z
                                .number({
                                    invalid_type_error: 'Lifting Ground height must be a Number',
                                })
                                .optional(),
                        })
                        .optional(),

                    platform: z
                        .object({
                            length: z
                                .number({
                                    invalid_type_error: 'Platform Length must be a Number',
                                })
                                .optional(),
                            width: z
                                .number({
                                    invalid_type_error: 'Platform Width must be a Number',
                                })
                                .optional(),
                        })
                        .optional(),

                    power: z
                        .string({
                            invalid_type_error: 'Power must be a String',
                        })
                        .optional(),

                    driving_unit: z
                        .string({
                            invalid_type_error: 'Driving Unit must be a String',
                        })
                        .optional(),

                    travelling_speed: z
                        .object({
                            lifting: z
                                .string({
                                    invalid_type_error: 'Lifting Travel speed must be a string',
                                })
                                .optional(),
                            horizontal: z
                                .string({
                                    invalid_type_error: 'Horizontal Travel speed must be a string',
                                })
                                .optional(),
                        })
                        .optional(),

                    material_delivery: z
                        .string({
                            invalid_type_error: 'Material Delivery must be a String',
                        })
                        .optional(),

                    installation: z
                        .string({
                            invalid_type_error: 'Installation must be a String',
                        })
                        .optional(),

                    safety: z
                        .array(z.string())
                        .refine((arr) => arr === null || (Array.isArray(arr) && arr.every((item) => typeof item === 'string')), {
                            message: 'Safety items must be an array of strings or null',
                        }),

                    features: z
                        .array(z.string())
                        .refine((arr) => arr === null || (Array.isArray(arr) && arr.every((item) => typeof item === 'string')), {
                            message: 'Feature items must be an array of strings or null',
                        }),


                    amc: z
                        .string({
                            invalid_type_error: 'AMC must be a String',
                        })
                        .optional(),

                    material_quality: z
                        .string({
                            invalid_type_error: 'Material Quality must be a String',
                        })
                        .optional(),
                })
                .optional(),

        })
        .optional(),

    tnc: z
        .object({
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
        })
        .optional(),

    quote_price: z
        .object({
            quantity: z
                .number({
                    invalid_type_error: 'Quantity must be a Number',
                })
                .optional(),

            basic_rate: z.number({
                invalid_type_error: 'Product Basic Rate must be a Number',
            }).optional(),

            installation_charges: z.number({
                invalid_type_error: 'Product Installation Charge must be a Number',
            }).optional(),

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
        .max(500, { message: 'Remark cannot be more than 500 characters.' })
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

module.exports = { Quote2Schema };
