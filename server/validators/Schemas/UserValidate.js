const { z } = require('zod');

const Userschema = z.object({
    name: z
        .string({
            invalid_type_error: 'Name must be a String',
        })
        .min(1, { message: 'Name cannot be empty.' })
        .min(3, { message: 'Name must be at least 3 characters.' })
        .max(100, { message: 'Name cannot be more than 100 characters.' })
        .optional(),

    username: z
        .string({ required_error: 'Username must be required!' })
        .trim()
        .min(4, { message: 'Username must be at least 4 characters.' })
        .max(16, { message: 'Username cannot be more than 16 characters.' })
        .optional(),

    email: z.string({ required_error: 'Email must be required!' }).email({ message: 'Invalid email format!' }),

    password: z
        .string({ required_error: 'Password must be required!' })
        .min(6, { message: 'Password must be at least 6 characters.' })
        .max(12, { message: 'Password cannot be more than 12 characters.' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/, {
            message: 'Password must have at least 1 of each: lowercase, uppercase, number, and special character.',
        })
        .optional(),

    role: z
        .string()
        .refine((value) => ['USER', 'ADMIN', 'SUPERADMIN'].includes(value.toUpperCase()), {
            message: 'Invalid role provided!',
        })
        .optional(),
});

module.exports = { Userschema };
