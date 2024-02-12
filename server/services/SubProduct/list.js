const { SubProduct } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const ViewSubProduct = async ({ id, status, createdby, category, main_product, model_no, hsn, name, sort, select, page = 1, size = 10 }) => {
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
        if (category) {
            queryObject.category = category;
        }
        if (main_product) {
            queryObject.main_product = main_product;
        }
        if (model_no) {
            queryObject.model_no = { $regex: new RegExp(model_no, 'i') };
        }
        if (hsn) {
            queryObject.hsn = { $regex: new RegExp(hsn, 'i') };
        }
        if (name) {
            queryObject.name = { $regex: new RegExp(name, 'i') };
        }

        // ======== Short , Select ======

        let apiData = SubProduct.find(queryObject);

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

        const SubProducts = await apiData
            .populate('product')
            .populate({
                path: 'category',
            })
            // .populate({
            //     path: 'specifications',
            // })
            .exec();

        return SubProducts;
    } catch (error) {
        throw new Error('An error occurred while fetching SubProducts: ' + error.message);
    }
};

module.exports = ViewSubProduct;