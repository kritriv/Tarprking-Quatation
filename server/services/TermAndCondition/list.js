const { TermAndCondition } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const ViewTermAndConditions = async ({ id, sub_product, sort, select, page, size }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }
        if (sub_product) {
            queryObject.sub_product = sub_product;
        }

        // ======== Short , Select ======

        let apiData = TermAndCondition.find(queryObject);
        let ObjCount = await TermAndCondition.countDocuments(queryObject);

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

        const TermAndConditions = await apiData;

        return { TermAndConditions, total: ObjCount };
    } catch (error) {
        throw new Error('An error occurred while fetching TermAndConditionss: ' + error.message);
    }
};
module.exports = ViewTermAndConditions;
