const Product = require('../models/ProductModel');
const { ObjectId } = require('mongodb');
const { limitOffsetPageNumber } = require('../utils/pagination');

const ViewProduct = async ({ ProductId, Status, CreatedBy, Name, sort, select, page = 1, size = 10 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (ProductId) {
            queryObject._id = ProductId;
        }
        if (Status !== undefined) {
            queryObject.product_status = Status.toLowerCase() === 'true';
        }
        if (CreatedBy) {
            queryObject.createdby = CreatedBy;
        }
        if (Name) {
            queryObject.product_name = { $regex: new RegExp(Name, 'i') };
        }

        let apiData = Product.find(queryObject);

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

        const Products = await apiData;
        return Products;
    } catch (error) {
        throw new Error('An error occurred while fetching products: ' + error.message);
    }
};

const AddProduct = async (data) => {
    try {
        const result = await Product(data).save();
        return result;
    } catch (error) {
        console.log(error)
        throw new Error(`Error occurred while adding product: ${error.message}`);
    }
};

const SingleProduct = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Product.findOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single product: ${error.message}`);
    }
};

const DeleteProduct = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Product.deleteOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting product: ${error.message}`);
    }
};

const UpdateProduct = async (id, updateProductData) => {
    try {
        const filter = { _id: id };
        const result = await Product.findByIdAndUpdate(filter, updateProductData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating product: ${error.message}`);
    }
};

module.exports = {
    ViewProduct,
    AddProduct,
    SingleProduct,
    DeleteProduct,
    UpdateProduct,
};
