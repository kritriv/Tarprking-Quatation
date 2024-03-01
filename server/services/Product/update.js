const { Product, ProductCategory } = require('../../models');
const { ObjectId } = require('mongodb');

const UpdateProduct = async (id, updateProductData) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            throw new Error('Product not found');
        }

        // If the category is being updated, update the associated category as well
        if (updateProductData.category && updateProductData.category !== existingProduct.category.toString()) {
            const existingCategory = await ProductCategory.findById(existingProduct.category);

            if (existingCategory) {
                // Remove the product ID from the old category
                existingCategory.products = existingCategory.products.filter(
                    (productId) => productId.toString() !== existingProduct._id.toString()
                );
                await existingCategory.save();
            }

            // Update the product category
            const newCategory = await ProductCategory.findById(updateProductData.category);

            if (newCategory) {
                newCategory.products.push(existingProduct._id);
                await newCategory.save();
            }
        }

        // Update the product data
        const result = await Product.findByIdAndUpdate(filter, updateProductData, {
            new: true,
        });

        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating Product: ${error.message}`);
    }
};

module.exports = UpdateProduct;
