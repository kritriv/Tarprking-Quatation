const { SubProduct, TermAndCondition } = require('../../models');
const DeleteTermAndCondition = async (id) => {
    try {
        const termCondition = await TermAndCondition.findById(id);
        const subProductId = termCondition.sub_product._id;

        const deletedtermCondition = await TermAndCondition.findByIdAndDelete(id);

        // Remove the tnc from the Sub product
        const subProduct = await SubProduct.findById(subProductId);
        if (subProduct) {
            subProduct.tnc = null;
            await subProduct.save();
        }

        return deletedtermCondition;
    } catch (error) {
        throw new Error(`Error occurred while deleting TermAndConditions: ${error.message}`);
    }
};

module.exports = DeleteTermAndCondition;
