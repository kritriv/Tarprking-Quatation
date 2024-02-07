const { handleApiResponse } = require('../modules/responseHandler');
const { ViewTermAndConditions, AddTermAndCondition, SingleTermAndCondition, DeleteTermAndCondition, UpdateTermAndCondition } = require('../services/TermAndConditionService');
const { idSchema } = require('../validators/Schemas');

// To get All TermAndCondition list
const getAllTermAndCondition = async (req, res) => {
    try {
        const TermAndConditions = await ViewTermAndConditions(req.query);
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

// To get Single TermAndCondition Details
const getSingleTermAndCondition = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const TermAndCondition = await SingleTermAndCondition(id);

        if (!TermAndCondition) {
            return handleApiResponse(res, 404, 'Term And Condition not found');
        }

        const formattedTermAndCondition = {
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
        };

        handleApiResponse(res, 200, 'Term And Condition fetched successfully', {
            data: formattedTermAndCondition,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the Term And Condition: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the Term And Condition' });
    }
};

// To Add a TermAndCondition to TermAndCondition list
const postSingleTermAndCondition = async (req, res) => {
    try {
        const TermAndCondition = await AddTermAndCondition(req.body);

        const formattedTermAndCondition = {
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
        };

        handleApiResponse(res, 201, 'Term And Condition added successfully', {
            data: formattedTermAndCondition,
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

// To Delete a Single TermAndCondition Details
const deleteSingleTermAndCondition = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const TermAndCondition = await SingleTermAndCondition(id);

        if (!TermAndCondition) {
            return handleApiResponse(res, 404, 'Term And Condition not found, deletion unsuccessful');
        }

        const TermAndConditionRes = await DeleteTermAndCondition(id);

        const formattedTermAndCondition = {
            id: TermAndConditionRes._id,
            sub_product: TermAndConditionRes.sub_product ? TermAndConditionRes.sub_product.name : null,
        };

        handleApiResponse(res, 200, 'Term And Condition deleted successfully', {
            deleted: formattedTermAndCondition,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the Term And Condition: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

// To Update a Single TermAndCondition Details
const updateSingleTermAndCondition = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateTermAndConditionData = req.body;
        const TermAndCondition = await UpdateTermAndCondition(id, updateTermAndConditionData);

        if (!TermAndCondition) {
            return handleApiResponse(res, 404, 'Term And Condition not found, update unsuccessful');
        }
        const formattedTermAndCondition = {
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
        };
        handleApiResponse(res, 200, 'Term And Condition updated successfully', {
            data: formattedTermAndCondition,
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

module.exports = {
    getAllTermAndCondition,
    postSingleTermAndCondition,
    getSingleTermAndCondition,
    deleteSingleTermAndCondition,
    updateSingleTermAndCondition,
};
