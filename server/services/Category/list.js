const { ProductCategory } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const ViewProductCategory = async ({ id, status, createdby, name, sort, select, page = 1, size = 5 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }
        if (status !== undefined) {
            queryObject.status = status.toLowerCase() === 'true';
        }
        if (createdby) {
            queryObject.createdby = createdby;
        }
        if (name) {
            queryObject.name = { $regex: new RegExp(name, 'i') };
        }

        // ======== Short , Select ======

        let apiData = ProductCategory.find(queryObject);

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

        const ProductCategorys = await apiData.populate('products').exec();
        return ProductCategorys;
    } catch (error) {
        throw new Error('An error occurred while fetching Product Category: ' + error.message);
    }
};

module.exports = ViewProductCategory;
