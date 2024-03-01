const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/Category');
// To Add a ProductCategory to ProductCategorys list
const CreateItem = async (req, res) => {
    try {
        const ProductCategory = await create(req.body);

        // const formattedCategory = {
        //     id: ProductCategory._id,
        //     status: ProductCategory.status,
        //     createdby: ProductCategory.createdby ? ProductCategory.createdby.username : null,
        //     name: ProductCategory.name,
        //     description: ProductCategory.description,
        //     products: ProductCategory.products.map((product) => ({
        //         id: product._id,
        //         name: product.name,
        //     })),
        // };

        handleApiResponse(res, 201, 'Category added successfully', {
            data: ProductCategory,
        });
    } catch (error) {
        if (error.message.includes('Category with this name already exists')) {
            handleApiResponse(res, 400, 'Category with this name already exists');
        } else if (error.message.includes('ObjectId failed' && 'User')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
