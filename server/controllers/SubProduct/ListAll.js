const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/SubProduct');

// To get All SubProducts list
const ListAll = async (req, res) => {
    try {
        const { SubProducts, total } = await list(req.query);
        if (!SubProducts || SubProducts.length === 0) {
            return handleApiResponse(res, 404, 'Sub Product not found');
        }

        const formattedSubProduct = SubProducts.map((SubProduct) => ({
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
        }));

        handleApiResponse(res, 200, 'Sub Products fetched successfully', {
            data: formattedSubProduct,
            total: total,
            nbHits: SubProducts.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the Sub Products', { error: error.message });
    }
};

module.exports = ListAll;
