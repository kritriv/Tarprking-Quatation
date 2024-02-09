const { Product, SubProduct, Specification } = require('../../models');
const DeleteSubProduct = async (id) => {
    try {
        const Sub_Product = await SubProduct.findById(id);
        const ProductId = Sub_Product.product;

        const result = await SubProduct.findByIdAndDelete(id);

        // Remove the product from the associated category
        const product = await Product.findById(ProductId);
        if (product) {
            product.sub_products.pull(id);
            await product.save();
        }
        await Specification.deleteMany({ sub_product: result._id });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting SubProduct: ${error.message}`);
    }
};

module.exports = DeleteSubProduct;
