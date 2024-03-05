const { SubProduct } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const ViewSubProduct = async ({ id, status, createdby, category, product, model_no, hsn, name, sort, select, page, size }) => {
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
        if (product) {
            queryObject.product = product;
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
        let ObjCount = await SubProduct.countDocuments(queryObject);

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

        return { SubProducts, total: ObjCount };
    } catch (error) {
        throw new Error('An error occurred while fetching SubProducts: ' + error.message);
    }
};

module.exports = ViewSubProduct;
