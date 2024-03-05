const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/TermAndCondition');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single TermAndCondition Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateTermAndConditionData = req.body;
        const TermAndCondition = await update(id, updateTermAndConditionData);

        if (!TermAndCondition) {
            return handleApiResponse(res, 404, `Term & Condition not found with id: ${id} ! Updation unsuccessful`);
        }
        // const formattedTermAndCondition = {
        //     id: TermAndCondition._id,
        //     sub_product: TermAndCondition.sub_product ? TermAndCondition.sub_product.name : null,
        //     prices: TermAndCondition.prices,
        //     payment_terms: TermAndCondition.payment_terms,
        //     packing_forwarding: TermAndCondition.packing_forwarding,
        //     client_responsibilities: TermAndCondition.client_responsibilities,
        //     material_delivery: TermAndCondition.material_delivery,
        //     installation_process: TermAndCondition.installation_process,
        //     operation: TermAndCondition.operation,
        //     force_majeure: TermAndCondition.force_majeure,
        //     warranty: TermAndCondition.warranty,
        //     termination: TermAndCondition.termination,
        //     jurisdiction: TermAndCondition.jurisdiction,
        //     validity: TermAndCondition.validity,
        // };
        handleApiResponse(res, 200, 'Term And Condition updated successfully', {
            data: TermAndCondition,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the Term And Condition: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'Internal Server Error' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'Company must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = UpdateItem;
