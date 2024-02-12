const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/SubProduct');
const { idSchema } = require('../../validators/Schemas');

// To get Single SubProduct Details
const ReadItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const SubProduct = await search(id);

        if (!SubProduct) {
            return handleApiResponse(res, 404, 'Sub Product not found');
        }
        const formattedSubProduct = {
            id: SubProduct._id,
            status: SubProduct.status,
            createdby: SubProduct.createdby ? SubProduct.createdby.username : null,
            category: SubProduct.category ? SubProduct.category.name : null,
            main_product: SubProduct.product ? SubProduct.product.name : null,
            model: SubProduct.model_no,
            hsn: SubProduct.hsn,
            name: SubProduct.name,
            description: SubProduct.description,
            image: SubProduct.image,
            price: {
                basic_rate: SubProduct.price.basic_rate,
                installation_charges: SubProduct.price.installation_charges,
                subTotal: SubProduct.price.subTotal,
            },
            timings: {
                delivery_time: SubProduct.timings.delivery_time,
                installation_time: SubProduct.timings.installation_time,
            },
            specifications: SubProduct.specifications ? SubProduct.specifications : null,
            tnc: SubProduct.tnc ? SubProduct.tnc : null,
        };

        handleApiResponse(res, 200, 'Sub Product details fetched successfully', {
            data: formattedSubProduct,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the Sub Product: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the Sub Product' });
    }
};

module.exports = ReadItem;
