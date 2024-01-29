const SubProduct = require('../models/SubProductModel');
const { ObjectId } = require('mongodb');
const { limitOffsetPageNumber } = require('../utils/pagination');

const ViewSubProduct = async ({  sort, select, page = 1, size = 10 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======


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

        const SubProducts = await apiData;
        return SubProducts;
    } catch (error) {
        throw new Error('An error occurred while fetching SubProducts: ' + error.message);
    }
};

const AddSubProduct = async (data) => {
    try {
        const result = await SubProduct(data).save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding SubProduct: ${error.message}`);
    }
};

const SingleSubProduct = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await SubProduct.findOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single SubProduct: ${error.message}`);
    }
};

const DeleteSubProduct = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await SubProduct.deleteOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting SubProduct: ${error.message}`);
    }
};

const UpdateSubProduct = async (id, updateSubProductData) => {
    try {
        const filter = { _id: id };
        const result = await SubProduct.findByIdAndUpdate(filter, updateSubProductData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating SubProduct: ${error.message}`);
    }
};

module.exports = {
    ViewSubProduct,
    AddSubProduct,
    SingleSubProduct,
    DeleteSubProduct,
    UpdateSubProduct,
};
