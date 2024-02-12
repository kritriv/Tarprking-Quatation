const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/TermAndCondition');

// To get All TermAndCondition list
const ListAll = async (req, res) => {
    try {
        const TermAndConditions = await list(req.query);
        if (!TermAndConditions || TermAndConditions.length === 0) {
            return handleApiResponse(res, 404, 'Term And Condition not found');
        }

        const formattedTermAndCondition = TermAndConditions.map((TermAndCondition) => ({
            id: TermAndCondition._id,
            sub_product: TermAndCondition.sub_product ? TermAndCondition.sub_product.name : null,
            prices: TermAndCondition.prices,
            payment_terms: TermAndCondition.payment_terms,
            packing_forwarding: TermAndCondition.packing_forwarding,
            client_responsibilities: TermAndCondition.client_responsibilities,
            material_delivery: TermAndCondition.material_delivery,
            installation_process: TermAndCondition.installation_process,
            operation: TermAndCondition.operation,
            force_majeure: TermAndCondition.force_majeure,
            warranty: TermAndCondition.warranty,
            termination: TermAndCondition.termination,
            jurisdiction: TermAndCondition.jurisdiction,
            validity: TermAndCondition.validity,
        }));

        handleApiResponse(res, 200, 'Term And Condition fetched successfully', {
            data: formattedTermAndCondition,
            nbHits: TermAndConditions.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the Term And Condition', { error: error.message });
    }
};

module.exports = ListAll;
