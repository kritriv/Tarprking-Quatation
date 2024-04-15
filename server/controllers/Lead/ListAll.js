const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/Lead');
// To get All Leads List
const ListAll = async (req, res) => {
    try {
        const { Leads , total} = await list(req.query);

        if (!Leads || Leads.length === 0) {
            return handleApiResponse(res, 404, 'Lead Not found');
        }

        handleApiResponse(res, 200, 'Lead details fetched successfully', {
            data: Leads,
            total: total,
            nbHits: Leads.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the Leads Data', { error: error.message });
    }
};

module.exports = ListAll;
