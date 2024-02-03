const z = require('zod');

const SpecificationSchema = z.object({
    sub_product: z.string({ required_error: 'Sub Product Id must be required!' }).refine((value) => value.length === 24, {
        message: 'Sub Product Id must be valid of 24 char',
    }),

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
});

module.exports = { SpecificationSchema };
