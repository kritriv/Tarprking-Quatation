const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/SubProduct');

// To Add a SubProduct to SubProducts list
const CreateItem = async (req, res) => {
    try {
        const SubProduct = await create(req.body);

        // const formattedSubProduct = {
        //     id: SubProduct._id,
        //     status: SubProduct.status,
        //     createdby: SubProduct.createdby ? SubProduct.createdby.username : null,
        //     category: SubProduct.category ? SubProduct.category.name : null,
        //     main_product: SubProduct.product ? SubProduct.product.name : null,
        //     model: SubProduct.model_no,
        //     hsn: SubProduct.hsn,
        //     name: SubProduct.name,
        //     description: SubProduct.description,
        //     image: SubProduct.image,
        //     price: {
        //         basic_rate: SubProduct.price.basic_rate,
        //         installation_charges: SubProduct.price.installation_charges,
        //         subTotal: SubProduct.price.subTotal,
        //     },
        //     timings: {
        //         delivery_time: SubProduct.timings.delivery_time,
        //         installation_time: SubProduct.timings.installation_time,
        //     },
        //     specifications: SubProduct.specifications ? SubProduct.specifications : null,
        //     tnc: SubProduct.tnc ? SubProduct.tnc : null,
        // };

        handleApiResponse(res, 201, 'Sub Product added successfully', {
            data: SubProduct,
        });
    } catch (error) {
        const duplicateFieldMatches = error.message.match(/[a-zA-Z_]+(?= already exists)/g);
        if (duplicateFieldMatches && duplicateFieldMatches.length > 0) {
            const duplicateFields = duplicateFieldMatches.map((field) => field.replace('sub_product_', ''));
            const errorMessage = `Sub Product with ${duplicateFields.join(', ')} already exists.`;
            handleApiResponse(res, 400, errorMessage, { error: error.message });
        } else {
            handleApiResponse(res, 500, 'An error occurred while adding the Sub Product', { error: error.message });
        }
    }
};

module.exports = CreateItem;
