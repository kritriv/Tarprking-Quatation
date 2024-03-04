const { SubProduct, Product } = require('../../models');
const { ObjectId } = require('mongodb');

const UpdateSubProduct = async (id, updateSubProductData) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const existingSubProduct = await SubProduct.findById(id);

        if (!existingSubProduct) {
            throw new Error('Sub Product not found');
        }

        // If the product is being updated, update the associated product as well
        if (updateSubProductData.product && updateSubProductData.product !== existingSubProduct.product.toString()) {
            const existingProduct = await Product.findById(existingSubProduct.product.id);

            if (existingProduct) {
                // Remove the product ID from the old product
                existingProduct.sub_products = existingProduct.sub_products.filter(
                    (productId) => productId.toString() !== existingSubProduct._id.toString()
                );
                await existingProduct.save();
            }

            const newProduct = await Product.findById(updateSubProductData.product);

            if (newProduct) {
                newProduct.sub_products.push(existingSubProduct._id);
                await newProduct.save();
            }
        }

        // Update the Sub product data
        const result = await SubProduct.findByIdAndUpdate(filter, updateSubProductData, {
            new: true,
        });

        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating Sub Product: ${error.message}`);
    }
};

module.exports = UpdateSubProduct;
