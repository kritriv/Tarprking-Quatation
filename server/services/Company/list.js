const { Company } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const ViewOurCompany = async ({ id, status, sort, select, page, size }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }
        if (status !== undefined) {
            queryObject.status = status.toLowerCase() === 'true';
        }

        // ======== Short , Select ======

        let apiData = Company.find(queryObject);
        let ObjCount = await Company.countDocuments(queryObject);

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

        const OurCompanies = await apiData;

        return { OurCompanies, total: ObjCount };
    } catch (error) {
        throw new Error('An error occurred while fetching Our Companies: ' + error.message);
    }
};

module.exports = ViewOurCompany;
