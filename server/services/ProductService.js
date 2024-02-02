const Product = require('../models/ProductModel');
const ProductCategory = require('../models/ProductCategoryModel');
const User = require('../models/UserModel');
const { ObjectId } = require('mongodb');
const { limitOffsetPageNumber } = require('../utils/pagination');

const ViewProduct = async ({ id, status, createdby, name, sort, select, page = 1, size = 10 }) => {
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

        const Products = await apiData
            .populate('category')
            .populate({
                path: 'sub_products',
            })
            .exec();

        return Products;
    } catch (error) {
        throw new Error('An error occurred while fetching products: ' + error.message);
    }
};

const SingleProduct = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Product.findOne(filter)
            .populate('category')
            .populate({
                path: 'sub_products',
            })
            .exec();

        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single product: ${error.message}`);
    }
};

const AddProduct = async ({ status, name, createdby, description, category, sub_products }) => {
    try {
        const existingUser = await User.findById(createdby);

        if (!existingUser) {
            throw new Error('User not found');
        }

        const existingCategory = await ProductCategory.findById(category);

        if (!existingCategory) {
            throw new Error('Category not found');
        }

        const newProduct = new Product({
            status,
            name,
            createdby,
            description,
            category,
            sub_products,
        });

        const result = await newProduct.save();

        existingCategory.products.push(result._id);
        await existingCategory.save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding product: ${error.message}`);
    }
};

const DeleteProduct = async (id) => {
    try {
        const product = await Product.findById(id);
        const categoryId = product.category;
        const result = await Product.findByIdAndDelete(id);

        // Remove the product from the associated category
        const category = await ProductCategory.findById(categoryId);
        if (category) {
            category.products.pull(id);
            await category.save();
        }

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
