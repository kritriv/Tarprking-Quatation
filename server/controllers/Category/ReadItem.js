const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/Category');
const { idSchema } = require('../../validators/Schemas');

// To get Single ProductCategory Details
const ReadItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const ProductCategory = await search(id);

        if (!ProductCategory) {
            return handleApiResponse(res, 404, `Category not found with id: ${id}`);
        }
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

        handleApiResponse(res, 200, 'Product Category details fetched successfully', {
            data: ProductCategory,
            nbHits: 1,
        });
    } catch (error) {
        console.log(error);
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the Category: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the Category' });
    }
};

module.exports = ReadItem;
