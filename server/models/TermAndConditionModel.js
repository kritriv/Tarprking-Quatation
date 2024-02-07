const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');
const { transformToJSON } = require('../utils/mongooseUtils');

const TermAndConditionSchema = new Schema(
    {
        sub_product: {
            type: Schema.Types.ObjectId,
            ref: 'SubProduct',
            unique: true,
            autopopulate: { select: '_id name' },
            validate: {
                validator: async function (value) {
                    const existingProduct = await this.constructor.findOne({ sub_product: value });
                    return !existingProduct || existingProduct._id.equals(this._id);
                },
                message: 'Term And Condition with this Sub Product Id already exists',
            },
        },
        prices: String,
        payment_terms: [String],
        packing_forwarding: String,
        client_responsibilities: [String],
        material_delivery: String,
        installation_process: [String],
        operation: String,
        force_majeure: String,
        warranty: String,
        termination: String,
        jurisdiction: String,
        validity: String,
    },
    { timestamps: true },
);

TermAndConditionSchema.plugin(autopopulate);
transformToJSON(TermAndConditionSchema, 'id');
const TermAndCondition = mongoose.model('TermAndCondition', TermAndConditionSchema);
module.exports = TermAndCondition;
