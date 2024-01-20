const ProductCategory = require('../models/ProductCategoryModel');
const { ObjectId } = require('mongodb');

const ViewProductCategory = async ({  category_name, category_status, sort, select, page = 1, limit = 5 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (category_name) {
            queryObject.category_name = { $regex: new RegExp(category_name, 'i') };
        }

        if (category_status !== undefined) {
            queryObject.category_status = category_status.toLowerCase() === 'true';
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

        const skip = (page - 1) * limit;
        apiData = apiData.skip(skip).limit(limit);

        const ProductCategorys = await apiData;
        return ProductCategorys;
    } catch (error) {
        throw new Error('An error occurred while fetching ProductCategorys: ' + error.message);
    }
};

const AddProductCategory = async (data) => {
    try {
        const result = await ProductCategory(data).save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding ProductCategory: ${error.message}`);
    }
};

const SingleProductCategory = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await ProductCategory.findOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single ProductCategory: ${error.message}`);
    }
};

const DeleteProductCategory = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await ProductCategory.deleteOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting ProductCategory: ${error.message}`);
    }
};

const UpdateProductCategory = async (id, updateProductCategoryData) => {
    try {
        const filter = { _id: id };
        const result = await ProductCategory.findByIdAndUpdate(filter, updateProductCategoryData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating ProductCategory: ${error.message}`);
    }
};

module.exports = {
    ViewProductCategory,
    AddProductCategory,
    SingleProductCategory,
    DeleteProductCategory,
    UpdateProductCategory,
};
