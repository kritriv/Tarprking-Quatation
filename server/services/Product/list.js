const { Product } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const ViewProduct = async ({ id, status, createdby, name, category, sort, select, page, size }) => {
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
        if (category) {
            queryObject.category = category;
        }

        let apiData = Product.find(queryObject);
        let ObjCount = await Product.countDocuments(queryObject);

        // ======== Short , Select ======

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

        const Products = await apiData
            .populate('category')
            .populate({
                path: 'sub_products',
            })
            .exec();

        return { Products, total: ObjCount };
    } catch (error) {
        throw new Error('An error occurred while fetching products: ' + error.message);
    }
};

module.exports = ViewProduct;
