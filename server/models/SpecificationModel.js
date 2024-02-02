const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');
const { transformToJSON } = require('../utils/mongooseUtils');

const SpecificationSchema = new Schema(
    {
        category: {
            type: Schema.Types.ObjectId,
            ref: 'SubProduct',
            autopopulate: true,
        },
        system_module: {
            type: String,
        },
        system_area: {
            type: String,
        },
        car_size: {
            type: String,
        },
        lifting_capacity: {
            type: String,
        },
        lifting_height: {
            top: {
                type: Number,
            },
            ground: {
                type: Number,
            },
        },
        platform: {
            length: {
                type: Number,
            },
            width: {
                type: Number,
            },
        },
        power: {
            type: String,
        },
        driving_unit: {
            type: String,
        },
        travelling_speed: {
            lifting: {
                type: String,
            },
            horizontal: {
                type: String,
            },
        },
        material_delivery: {
            type: String,
        },
        installation: {
            type: String,
        },
        safety: [
            {
                type: String,
            },
        ],
        features: [
            {
                type: String,
            },
        ],
        amc: {
            type: String,
        },
        material_quality: {
            type: String,
        },
    },
    { timestamps: true },
);

SpecificationSchema.plugin(autopopulate);
transformToJSON(SpecificationSchema, 'id');
const Specification = mongoose.model('Specification', SpecificationSchema);
module.exports = Specification;
