const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/Product');
// To Add a Product to Products list
const CreateItem = async (req, res) => {
    try {
        const Product = await create(req.body);
        const formattedProduct = {
            id: Product._id,
            status: Product.status,
            createdby: Product.createdby ? Product.createdby.username : null,
            name: Product.name,
            description: Product.description,
            category: Product.category ? Product.category.name : null,
        };

        handleApiResponse(res, 201, 'Product added successfully', {
            data: formattedProduct,
        });
    } catch (error) {
        const duplicateFieldMatches = error.message.match(/[a-zA-Z_]+(?= already exists)/g);
        if (duplicateFieldMatches && duplicateFieldMatches.length > 0) {
            const duplicateFields = duplicateFieldMatches.map((field) => field.replace('product_', ''));
            const errorMessage = `Product with ${duplicateFields.join(', ')} is already exists.`;
            handleApiResponse(res, 400, errorMessage, error);
        } else if (error.message.includes('Category not found')) {
            handleApiResponse(res, 404, 'Category not found', { error: error.message });
        } else if (error.message.includes('User not found')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
