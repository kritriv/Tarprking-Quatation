const { SubProduct, TermAndCondition } = require('../../models');
const AddTermAndCondition = async ({
    sub_product,
    prices,
    payment_terms,
    packing_forwarding,
    client_responsibilities,
    material_delivery,
    installation_process,
    operation,
    force_majeure,
    warranty,
    termination,
    jurisdiction,
    validity,
}) => {
    try {
        const existingSubProduct = await SubProduct.findById(sub_product);

        if (!existingSubProduct) {
            throw new Error('Sub Product not found');
        }

        const newTermAndConditions = new TermAndCondition({
            sub_product,
            prices,
            payment_terms,
            packing_forwarding,
            client_responsibilities,
            material_delivery,
            installation_process,
            operation,
            force_majeure,
            warranty,
            termination,
            jurisdiction,
            validity,
        });

        const result = await TermAndCondition(newTermAndConditions).save();
        existingSubProduct.tnc = result._id;
        await existingSubProduct.save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding TermAndConditions: ${error.message}`);
    }
};

module.exports = AddTermAndCondition;
