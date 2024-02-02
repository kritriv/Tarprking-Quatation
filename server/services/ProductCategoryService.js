const ProductCategory = require('../models/ProductCategoryModel');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const { ObjectId } = require('mongodb');
const { limitOffsetPageNumber } = require('../utils/pagination');

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
        throw new Error('An error occurred while fetching ProductCategorys: ' + error.message);
    }
};

const AddProductCategory = async ({ status, createdby, name, description }) => {
    try {
        const existingUser = await User.findById(createdby);

        if (!existingUser) {
            throw new Error('User not found');
        }

        const newProductCategory = new ProductCategory({
            status,
            createdby,
            name,
            description,
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
