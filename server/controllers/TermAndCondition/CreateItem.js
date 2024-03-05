const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/TermAndCondition');
// To Add a TermAndCondition to TermAndCondition list
const CreateItem = async (req, res) => {
    try {
        const TermAndCondition = await create(req.body);

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

        handleApiResponse(res, 201, 'Term And Condition added successfully', {
            data: TermAndCondition,
        });
    } catch (error) {
        const duplicateFieldMatches = error.message.match(/[a-zA-Z_]+(?= already exists)/g);
        if (duplicateFieldMatches) {
            const errorMessage = `Terms & Condition with this Sub product ${duplicateFieldMatches} already exists.`;
            handleApiResponse(res, 400, errorMessage, { error: error.message });
        } else {
            handleApiResponse(res, 500, 'An error occurred while adding the Term And Condition', { error: error.message });
        }
    }
};
module.exports = CreateItem;
