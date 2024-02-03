const { handleApiResponse } = require('../modules/responseHandler');
const { ViewSpecification, AddSpecification, SingleSpecification, DeleteSpecification, UpdateSpecification } = require('../services/SpecificationService');
const { idSchema } = require('../validators/Schemas');

// To get All Specifications list
const getAllSpecifications = async (req, res) => {
    try {
        const Specifications = await ViewSpecification(req.query);
        if (!Specifications || Specifications.length === 0) {
            return handleApiResponse(res, 404, 'Specification not found');
        }

        handleApiResponse(res, 200, 'Specifications fetched successfully', {
            data: Specifications,
            nbHits: Specifications.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the Specifications', { error: error.message });
    }
};

// To get Single Specification Details
const getSingleSpecification = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const Specification = await SingleSpecification(id);

        if (!Specification) {
            return handleApiResponse(res, 404, 'Specification not found');
        }

        handleApiResponse(res, 200, 'Specification details fetched successfully', {
            data: Specification,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the Specification: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the Specification' });
    }
};

// To Add a Specification to Specifications list
const postSingleSpecification = async (req, res) => {
    try {
        const Specification = await AddSpecification(req.body);

        handleApiResponse(res, 201, 'Specification added successfully', {
            data: Specification,
        });
    } catch (error) {
        if (error.message.includes('Specification with this Sub Product Id already exists')) {
            handleApiResponse(res, 400, 'Specification with this Sub Product Id already exists');
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

// To Delete a Single Specification Details
const deleteSingleSpecification = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const Specification = await SingleSpecification(id);

        if (!Specification) {
            return handleApiResponse(res, 404, 'Specification not found, deletion unsuccessful');
        }

        const SpecificationRes = await DeleteSpecification(id);

        handleApiResponse(res, 200, 'Specification deleted successfully', {
            deleted: SpecificationRes,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the Category: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

// To Update a Single Specification Details
const updateSingleSpecification = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateSpecificationData = req.body;
        const Specification = await UpdateSpecification(id, updateSpecificationData);

        if (!Specification) {
            return handleApiResponse(res, 404, 'Specification not found, update unsuccessful');
        }

        handleApiResponse(res, 200, 'Specification updated successfully', {
            data: SpecificationRes,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single Client: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'Internal Server Error' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'Specification must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = {
    getAllSpecifications,
    postSingleSpecification,
    getSingleSpecification,
    deleteSingleSpecification,
    updateSingleSpecification,
};
