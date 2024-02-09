const { Company } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const ViewOurCompany = async ({ id, sort, select, page = 1, size = 10 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }

        // ======== Short , Select ======

        let apiData = Company.find(queryObject);

        if (sort) {
            let sortFix = sort.replace(',', ' ');
            apiData = apiData.sort(sortFix);
        }
        if (select) {
            let selectFix = select.split(',').join(' ');
            apiData = apiData.select(selectFix);
        }

        // ===== Pagination and limits ====

        const { limit, offset } = limitOffsetPageNumber(page, size);
        apiData = apiData.skip(offset).limit(limit);

        const OurCompanys = await apiData;

        return OurCompanys;
    } catch (error) {
        throw new Error('An error occurred while fetching OurCompanys: ' + error.message);
    }
};

module.exports = ViewOurCompany;
