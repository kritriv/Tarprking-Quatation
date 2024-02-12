const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/Category');

// To get All ProductCategorys list
const ListAll = async (req, res) => {
    try {
        const ProductCategory = await list(req.query);
        if (!ProductCategory || ProductCategory.length === 0) {
            return handleApiResponse(res, 404, 'Category not found');
        }
        const formattedCategory = ProductCategory.map((category) => ({
            id: category._id,
            status: category.status,
            createdby: category.createdby ? category.createdby.username : null,
            name: category.name,
            description: category.description,
            products: category.products.map((product) => ({
                id: product._id,
                name: product.name,
            })),
        }));

        handleApiResponse(res, 200, 'Product Categories fetched successfully', {
            data: formattedCategory,
            nbHits: ProductCategory.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the Categories', { error: error.message });
    }
};

module.exports = ListAll;
