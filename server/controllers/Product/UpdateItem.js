const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/Product');
const { idSchema } = require('../../validators/Schemas');
// To Update a Single Product Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const updateProductData = req.body;

        const updatedProduct = await update(id, updateProductData);

        if (!updatedProduct) {
            return res.status(404).json({ message: `Product not found with id: ${id} ! Updation unsuccessful` });
        }
        const formattedProduct = {
            id: updatedProduct._id,
            status: updatedProduct.status,
            createdby: updatedProduct.createdby ? updatedProduct.createdby.username : null,
            name: updatedProduct.name,
            description: updatedProduct.description,
            category: updatedProduct.category ? updatedProduct.category.name : null,
        };

        handleApiResponse(res, 200, 'Product updated successfully', {
            data: formattedProduct,
        });
    } catch (error) {
        console.log(error)
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single Product: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'Internal Server Error' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'Product Name must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = UpdateItem;
