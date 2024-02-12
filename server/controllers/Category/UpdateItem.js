const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/Category');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single ProductCategory Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateProductCategoryData = req.body;
        const ProductCategory = await update(id, updateProductCategoryData);

        if (!ProductCategory) {
            return handleApiResponse(res, 404, 'Product Category not found, update unsuccessful');
        }
        const formattedCategory = {
            id: ProductCategory._id,
            status: ProductCategory.status,
            createdby: ProductCategory.createdby ? ProductCategory.createdby.username : null,
            name: ProductCategory.name,
            description: ProductCategory.description,
            products: ProductCategory.products.map((product) => ({
                id: product._id,
                name: product.name,
            })),
        };

        handleApiResponse(res, 200, 'Product Category updated successfully', {
            data: formattedCategory,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single Category: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'An error occurred while updating the single Category' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 400, 'Category Name must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = UpdateItem;
