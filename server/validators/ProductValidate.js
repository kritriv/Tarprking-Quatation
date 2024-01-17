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

    createdby: z
        .string({
            required_error: 'createdby Id must be required!',
            invalid_type_error: 'createdby Id must be a String',
        }),

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

    product_img: z.string({
        invalid_type_error: 'Product Image must be a String',
    }),

    product_price: z.object({
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

    product_specification: z.object({
        system_area: z.object({
            length: z.string(),
            width: z.string(),
            height: z.string(),
        }),

        suitable_cars: z.object({
            length: z.string(),
            width: z.string(),
            height: z.string(),
        }),

        lifting_capacity: z.string(),
        platform_length: z.string(),
        platform_width: z.string(),
        driving_unit: z.string(),
        travel_speed: z.string(),

        power_source: z.object({
            main: z.string(),
            lighting: z.string(),
        }),

        power_consumption: z.object({
            single_unit: z.string(),
            combined_units: z.string(),
        }),

        operation_control: z.string(),
    }),

    product_features: z.array(z.string()),

    product_safety: z.object({
        mechanical: z.string(),
        hydraulic: z.string(),
        electrical: z.string(),
    }),
});

module.exports = productSchema;
