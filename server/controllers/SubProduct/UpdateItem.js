const { handleApiResponse } = require('../../modules/responseHandler');
const { update, search } = require('../../services/SubProduct');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single SubProduct Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const exitSubProduct = await search(id);
        if (!exitSubProduct) {
            return handleApiResponse(res, 404, `Sub Product not found with id: ${id} ! Updation unsuccessful`);
        }
        const updateSubProductData = req.body;
        const SubProduct = await update(id, updateSubProductData);
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

        handleApiResponse(res, 200, 'Sub Product updated successfully', {
            data: SubProduct,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single Sub Product: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'Internal Server Error' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'Sub Product must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = UpdateItem;
