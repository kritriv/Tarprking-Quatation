const { Quote2 } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const ViewQuote = async ({ id, sort, select, page, size }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }

        let apiData = Quote2.find(queryObject);
        let ObjCount = await Quote2.countDocuments(queryObject);

        // ======== Short , Select ======

        if (sort) {
            let sortFix = sort.replace(',', ' ');
            apiData = apiData.sort(sortFix);
        } else {
            apiData = apiData.sort({ createdAt: -1 });
        }
        if (select) {
            let selectFix = select.split(',').join(' ');
            apiData = apiData.select(selectFix);
        }

        // ===== Pagination and limits ====

        const { limit, offset } = limitOffsetPageNumber(page, size);
        apiData = apiData.skip(offset).limit(limit);

        const Quotes = await apiData;

        return { Quotes, total: ObjCount };
    } catch (error) {
        throw new Error('An error occurred while fetching quotes: ' + error.message);
    }
};

module.exports = ViewQuote;
