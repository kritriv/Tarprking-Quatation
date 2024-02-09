const { handleApiResponse } = require('../modules/responseHandler');
const { ViewQuote, AddQuote, SingleQuote, DeleteQuote, UpdateQuote, AddQuoteBackImg } = require('../services/QuoteService');
const { idSchema } = require('../validators/Schemas');

// To get All Quotes List
const getAllQuotes = async (req, res) => {
    try {
        const Quotes = await ViewQuote(req.query);

        if (!Quotes || Quotes.length === 0) {
            return handleApiResponse(res, 404, 'Quotes not found');
        }

        handleApiResponse(res, 200, 'Quotes  fetched successfully', {
            data: Quotes,
            nbHits: Quotes.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the Quotes', { error: error.message });
    }
};
// To get Single Quote Details
const getSingleQuote = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const Quote = await SingleQuote(id);

        if (!Quote) {
            return handleApiResponse(res, 404, 'Quote not found');
        }

        handleApiResponse(res, 200, 'Quote  details fetched successfully', {
            data: Quote,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the Quote: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the Quote' });
    }
};

// To Add a Quote to Quotes list
const postSingleQuote = async (req, res) => {
    try {
        const Quote = await AddQuote(req.body);

        handleApiResponse(res, 201, 'Quote added successfully', {
            data: Quote,
        });
    } catch (error) {
        const duplicateFieldMatches = error.message.match(/[a-zA-Z_]+(?= already exists)/g);
        if (duplicateFieldMatches && duplicateFieldMatches.length > 0) {
            const duplicateFields = duplicateFieldMatches.map((field) => field.replace('quote_', ''));
            const errorMessage = `Quote with ${duplicateFields.join(', ')} is already exists.`;
            handleApiResponse(res, 400, errorMessage, error);
        } else if (error.message.includes('Client not found')) {
            handleApiResponse(res, 404, 'Client not found', { error: error.message });
        } else if (error.message.includes('User not found')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
        } else if (error.message.includes('Product not found')) {
            handleApiResponse(res, 404, 'Product not found', { error: error.message });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

// To Delete a Single Quote Details
const deleteSingleQuote = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const DeletedQuote = await SingleQuote(id);

        if (!DeletedQuote) {
            return handleApiResponse(res, 404, 'Quote not found, deletion unsuccessful');
        }

        const DeletedQuoteRes = await DeleteQuote(id);

        handleApiResponse(res, 200, 'Quote deleted successfully', {
            deleted: DeletedQuoteRes,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the Quote: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

// To Update a Single Quote Details
const updateSingleQuote = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updatedQuote = await UpdateQuote(id, req.body);

        if (!updatedQuote) {
            return res.status(404).json({ message: 'Quote not found, update unsuccessful' });
        }

        handleApiResponse(res, 200, 'Quote updated successfully', {
            data: updatedQuote,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single Quote: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'Internal Server Error' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'Quote Name must be unique', { error: error.message });
            } else if (error.message.includes('Client not found')) {
                handleApiResponse(res, 404, 'Client not found', { error: error.message });
            } else if (error.message.includes('Created by User not found')) {
                handleApiResponse(res, 404, 'Created by User not found', { error: error.message });
            } else if (error.message.includes('Product not found')) {
                handleApiResponse(res, 404, 'Product not found', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

const UploadQuoteBackImg = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const file = req.file;
        if (!file) {
            return handleApiResponse(res, 400, 'No file uploaded. Please provide a valid image file.');
        }
        const subProduct = await AddQuoteBackImg(id, file);

        handleApiResponse(res, 201, 'Quote back image added successfully', {
            data: subProduct,
        });
    } catch (error) {
        console.log(error);
        const errorMessage = error.message.includes('Invalid ID format')
            ? 'Provide valid Quote Id'
            : error.message.includes('Invalid file type. Only images are allowed')
            ? 'Only images are allowed'
            : `An error occurred while updating the quote back img: ${error.message}`;

        if (errorMessage === 'Provide valid Quote Id' || errorMessage === 'Only images are allowed') {
            handleApiResponse(res, 400, errorMessage);
        } else {
            if (error.message.includes('Quote not found')) {
                handleApiResponse(res, 404, 'Quote not found', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = {
    getAllQuotes,
    getSingleQuote,
    postSingleQuote,
    deleteSingleQuote,
    updateSingleQuote,
    UploadQuoteBackImg,
};
