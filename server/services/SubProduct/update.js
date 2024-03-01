// const { SubProduct } = require('../../models');
// const { ObjectId } = require('mongodb');
// const UpdateSubProduct = async (id, updateSubProductData) => {
//     try {
//         const filter = { _id: new ObjectId(id) };
//         const result = await SubProduct.findByIdAndUpdate(filter, updateSubProductData, {
//             new: true,
//         });
//         return result;
//     } catch (error) {
//         throw new Error(`Error occurred while updating SubProduct: ${error.message}`);
//     }
// };

// module.exports = UpdateSubProduct;


const { SubProduct, Product } = require('../../models');
const { ObjectId } = require('mongodb');

const UpdateSubProduct = async (id, updateSubProductData) => {
    try {
        const filter = { _id: new ObjectId(id) };

        // Find the existing subproduct
        const subProduct = await SubProduct.findById(filter);

        if (!subProduct) {
            throw new Error('SubProduct not found');
        }

        // Update the subproduct data
        const result = await SubProduct.findByIdAndUpdate(filter, updateSubProductData, {
            new: true,
        });

        // If the subproduct is associated with a product, update the product data
        if (subProduct.product) {
            const product = await Product.findById(subProduct.product);

            if (product) {
                // Find the index of the subproduct in the product's sub_products array
                const subProductIndex = product.sub_products.findIndex(
                    (subProductId) => subProductId.toString() === subProduct._id.toString()
                );

                if (subProductIndex !== -1) {
                    // Update the product's subproduct data
                    product.sub_products[subProductIndex] = result;
                    await product.save();
                }
            }
        }

        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating SubProduct: ${error.message}`);
    }
};

module.exports = UpdateSubProduct;
