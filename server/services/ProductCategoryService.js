const ProductCategory = require('../models/ProductCategoryModel');
const Product = require('../models/ProductModel');
const { ObjectId } = require('mongodb');
const { limitOffsetPageNumber } = require('../utils/pagination');

const ViewProductCategory = async ({ CategoryId, Status, CreatedBy, Name, sort, select, page = 1, size = 5 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (CategoryId) {
            queryObject._id = CategoryId;
        }
        if (Status !== undefined) {
            queryObject.category_status = Status.toLowerCase() === 'true';
        }
        if (CreatedBy) {
            queryObject.createdby = CreatedBy;
        }
        if (Name) {
            queryObject.category_name = { $regex: new RegExp(Name, 'i') };
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
        throw new Error('An error occurred while fetching ProductCategorys: ' + error.message);
    }
};

const AddProductCategory = async ({ category_name, createdby, category_description, category_status }) => {
    try {
        const newProductCategory = new ProductCategory({
            category_name,
            createdby,
            category_description,
            category_status,
        });

        const result = await ProductCategory(newProductCategory).save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding ProductCategory: ${error.message}`);
    }
};

const SingleProductCategory = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await ProductCategory.findOne(filter).populate('products').exec();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single ProductCategory: ${error.message}`);
    }
};

const DeleteProductCategory = async (id) => {
    try {
        const result = await ProductCategory.findByIdAndDelete(id);
        await Product.deleteMany({ category: result._id });
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
