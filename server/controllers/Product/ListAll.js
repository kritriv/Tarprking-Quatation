const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/Product');
// To get All Products List
const ListAll = async (req, res) => {
    try {
        const Products = await list(req.query);

        if (!Products || Products.length === 0) {
            return handleApiResponse(res, 404, 'Products not found');
        }

        const formattedProduct = Products.map((product) => ({
            id: product._id,
            status: product.status,
            createdby: product.createdby ? product.createdby.username : null,
            name: product.name,
            description: product.description,
            category: product.category ? product.category.name : null,
            subproducts: product.sub_products.map((subproduct) => ({
                id: subproduct._id,
                name: subproduct.name,
            })),
        }));

        handleApiResponse(res, 200, 'Products  fetched successfully', {
            data: formattedProduct,
            nbHits: Products.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the Products', { error: error.message });
    }
};
module.exports = ListAll;
