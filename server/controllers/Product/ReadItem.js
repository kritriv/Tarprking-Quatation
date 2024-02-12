const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/Product');
const { idSchema } = require('../../validators/Schemas');
// To get Single Product Details
const ReadItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const Product = await search(id);

        if (!Product) {
            return handleApiResponse(res, 404, 'Product not found');
        }
        const formattedProduct = {
            id: Product._id,
            status: Product.status,
            createdby: Product.createdby ? Product.createdby.username : null,
            name: Product.name,
            description: Product.description,
            category: Product.category ? Product.category.name : null,
            subproducts: Product.sub_products.map((subproduct) => ({
                id: subproduct._id,
                name: subproduct.name,
            })),
        };

        handleApiResponse(res, 200, 'Product  details fetched successfully', {
            data: formattedProduct,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the Product: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the Product' });
    }
};

module.exports = ReadItem;
