const { ProductCategory, Product, SubProduct, Specification } = require('../../models');
const DeleteProduct = async (id) => {
    try {
        const product = await Product.findById(id);
        const categoryId = product.category;

        // Remove the product from the associated category
        const category = await ProductCategory.findById(categoryId);
        if (category) {
            category.products.pull(id);
            await category.save();
        }

        await SubProduct.deleteMany({ product: id });

        // Delete specifications associated with the sub-products
        await Specification.deleteMany({ sub_product: { $in: product.sub_products } });

        const result = await Product.findByIdAndDelete(id);

        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting product: ${error.message}`);
    }
};

module.exports = DeleteProduct;
