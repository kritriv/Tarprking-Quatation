const Product = require('../models/ProductModel');
const { ObjectId } = require('mongodb');

const ViewProduct = async ({ product_id, product_HSN, product_status, admin_create_username, product_name, sub_type, sort, select, page = 1, limit = 5 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (product_id) {
            queryObject.product_id = product_id;
        }
        if (product_HSN) {
            queryObject.product_HSN = product_HSN;
        }
        if (product_status !== undefined) {
            queryObject.product_status = product_status.toLowerCase() === 'true';
        }
        if (admin_create_username) {
            queryObject.admin_create_username = {
                $regex: new RegExp(admin_create_username, 'i'),
            };
        }
        if (product_name) {
            queryObject.product_name = { $regex: new RegExp(product_name, 'i') };
        }
        if (sub_type) {
            queryObject.sub_type = { $regex: new RegExp(sub_type, 'i') };
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

        const skip = (page - 1) * limit;
        apiData = apiData.skip(skip).limit(limit);

        const Products = await apiData;
        return Products;
    } catch (error) {
        throw new Error('An error occurred while fetching vendors: ' + error.message);
    }
};

const AddProduct = async (data) => {
    const result = await Product(data).save();
    return result;
};

const SingleProduct = async (id) => {
    const filter = { _id: new ObjectId(id) };
    const result = await Product.findOne(filter);
    return result;
};

const DeleteProduct = async (id) => {
    const filter = { _id: new ObjectId(id) };
    const result = await Product.deleteOne(filter);
    return result;
};

const UpdateProduct = async (id, updateProductData) => {
    const filter = { _id: id };
    const result = await Product.findByIdAndUpdate(filter, updateProductData, {
        new: true,
    });
    return result;
};

module.exports = {
    ViewProduct,
    AddProduct,
    SingleProduct,
    DeleteProduct,
    UpdateProduct,
};
