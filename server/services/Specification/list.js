const { Specification } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const ViewSpecification = async ({ id, sort, select, page = 1, size = 10 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }

        // ======== Short , Select ======

        let apiData = Specification.find(queryObject);

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

        const Specifications = await apiData.populate('sub_product').exec();

        return Specifications;
    } catch (error) {
        throw new Error('An error occurred while fetching Specifications: ' + error.message);
    }
};

module.exports = ViewSpecification;
