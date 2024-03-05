const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/TermAndCondition');
const { idSchema } = require('../../validators/Schemas');

// To get Single TermAndCondition Details
const ReadItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const TermAndCondition = await search(id);

        if (!TermAndCondition) {
            return handleApiResponse(res, 404, `Term & Condition not found with id: ${id}`);
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

        handleApiResponse(res, 200, 'Term And Condition fetched successfully', {
            data: TermAndCondition,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the Term And Condition: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the Term And Condition' });
    }
};

module.exports = ReadItem;
