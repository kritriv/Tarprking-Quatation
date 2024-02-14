const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/Quotation2');

// To get All Quotes List
const ListAll = async (req, res) => {
    try {
        const Quotes = await list(req.query);

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
module.exports = ListAll;
