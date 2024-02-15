const { z } = require('zod');

function isValidCompanyEmail(email) {
    const companyDomain = 'tarparking.com';
    const regex = new RegExp(`^[a-zA-Z0-9._-]+@${companyDomain}$`);
    return regex.test(email);
}

const RegisterSchema = z.object({
    name: z.string({ required_error: 'Name must be required!' }).trim().min(4, { message: 'Name must be at least 4 characters.' }).max(16, { message: 'Name cannot be more than 16 characters.' }),

    username: z
        .string({ required_error: 'Username must be required!' })
        .trim()
        .min(4, { message: 'Username must be at least 4 characters.' })
        .max(16, { message: 'Username cannot be more than 16 characters.' }),

    email: z.string({ required_error: 'Email must be required!' }).refine((value) => isValidCompanyEmail(value), {
        message: 'Invalid email format or not a company email!',
    }),

    password: z
        .string({ required_error: 'Password must be required!' })
        .min(6, { message: 'Password must be at least 6 characters.' })
        .max(12, { message: 'Password cannot be more than 12 characters.' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/, {
            message: 'Password must have at least 1 of each: lowercase, uppercase, number, and special character.',
        }),

    role: z
        .string()
        .refine((value) => ['USER', 'ADMIN', 'SUPERADMIN'].includes(value.toUpperCase()), {
            message: 'Unkown role provided!',
        })
        .optional(),
});

const LoginSchema = z.object({
    email: z.string({ required_error: 'Email must be required!' }).refine((value) => isValidCompanyEmail(value), {
        message: 'Invalid email format or not a company email!',
    }),

    password: z
        .string({ required_error: 'Password must be required!' })
        .min(6, { message: 'Password must be at least 6 characters.' })
        .max(12, { message: 'Password cannot be more than 12 characters.' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/, {
            message: 'Password must have at least 1 of each: lowercase, uppercase, number, and special character.',
        }),
});

module.exports = { RegisterSchema, LoginSchema };
