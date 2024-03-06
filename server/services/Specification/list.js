const { Specification } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const ViewSpecification = async ({ id, sub_product, sort, select, page, size }) => {
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

        let apiData = Specification.find(queryObject);
        let ObjCount = await Specification.countDocuments(queryObject);

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

        const Specifications = await apiData.populate('sub_product').exec();

        return { Specifications, total: ObjCount };
    } catch (error) {
        throw new Error('An error occurred while fetching Specifications: ' + error.message);
    }
};

module.exports = ViewSpecification;
