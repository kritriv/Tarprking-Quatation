const z = require('zod');
const mongoose = require('mongoose');

const idSchema = z
    .object({
        _id: z
            .string()
            .refine(value => mongoose.Types.ObjectId.isValid(value), { message: 'Invalid ID format' }),
    });

module.exports = {idSchema};
