const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const Schema = mongoose.Schema;

// Define the schema for the product
const ProductSchema = new Schema(
    {
        product_id: {
            type: String,
            unique: true,
            validate: {
                validator: async function (value) {
                    const existingProduct = await this.constructor.findOne({ product_id: value });
                    return !existingProduct || existingProduct._id.equals(this._id);
                },
                message: 'Product with this ID already exists',
            },
        },
        product_HSN: {
            type: String,
            unique: true,
            validate: {
                validator: async function (value) {
                    const existingProduct = await this.constructor.findOne({ product_HSN: value });
                    return !existingProduct || existingProduct._id.equals(this._id);
                },
                message: 'Product with this HSN already exists',
            },
        },
        product_status: {
            type: Boolean,
            default: true,
        },
        createdby: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
            autopopulate: { select: '_id role username email' },
        },
        product_name: {
            type: String,
        },
        product_description: {
            type: String,
        },
        sub_type: {
            type: String,
        },
        product_img: {
            type: String,
        },

        product_price: {
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            basic_rate: {
                type: Number,
            },
            installation_charges: {
                type: Number,
            },
            subTotal: {            // basic_rate + installation_charges
                type: Number,
                default: 0,
            },
        },

        product_features: {
            type: [String],
        },
        product_safety: {
            mechanical: {
                type: String,
            },
            hydraulic: {
                type: String,
            },
            electrical: {
                type: String,
            },
        },
        product_specification: {
            system_area: {
                length: {
                    type: String,
                },
                width: {
                    type: String,
                },
                height: {
                    type: String,
                },
            },
            suitable_cars: {
                length: {
                    type: String,
                },
                width: {
                    type: String,
                },
                height: {
                    type: String,
                },
            },
            lifting_capacity: {
                type: String,
            },
            platform_length: {
                type: String,
            },
            platform_width: {
                type: String,
            },
            driving_unit: {
                type: String,
            },
            travel_speed: {
                type: String,
            },
            power_source: {
                main: {
                    type: String,
                },
                lighting: {
                    type: String,
                },
            },
            power_consumption: {
                single_unit: {
                    type: String,
                },
                combined_units: {
                    type: String,
                },
            },
            operation_control: {
                type: String,
            },
        },
    },
    { timestamps: true },
);

ProductSchema.plugin(autopopulate);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
