const { SubProduct, Specification } = require('../../models');
const DeleteSpecification = async (id) => {
    try {
        const specification = await Specification.findById(id);
        const subProductId = specification.sub_product._id;

        const deletedSpecification = await Specification.findByIdAndDelete(id);

        // Remove the Specification from the Sub PRoduct
        const subProduct = await SubProduct.findById(subProductId);
        if (subProduct) {
            // subProduct.specifications.pull(id);
            subProduct.specifications = null;
            await subProduct.save();
        }

        return deletedSpecification;
    } catch (error) {
        throw new Error(`Error occurred while deleting Specification: ${error.message}`);
    }
};

module.exports = DeleteSpecification;
