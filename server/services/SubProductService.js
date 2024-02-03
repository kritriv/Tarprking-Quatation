const Product = require('../models/ProductModel');
const ProductCategory = require('../models/ProductCategoryModel');
const SubProduct = require('../models/SubProductModel');
const Specification = require('../models/SpecificationModel');
const { ObjectId } = require('mongodb');
const { limitOffsetPageNumber } = require('../utils/pagination');

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
            .exec();

        return SubProducts;
    } catch (error) {
        throw new Error('An error occurred while fetching SubProducts: ' + error.message);
    }
};

const SingleSubProduct = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await SubProduct.findOne(filter)
            .populate('product')
            .populate({
                path: 'category',
            })
            .exec();

        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single SubProduct: ${error.message}`);
    }
};

const AddSubProduct = async ({ model_no, hsn, status, createdby, category, product, name, description, image, price, timings, specification }) => {
    try {
        const existingCategory = await ProductCategory.findById(category);

        if (!existingCategory) {
            throw new Error('Category not found');
        }

        const existingProduct = await Product.findById(product);

        if (!existingProduct) {
            throw new Error('Product not found');
        }

        const newSubProduct = new SubProduct({
            model_no,
            hsn,
            status,
            createdby,
            category,
            product,
            name,
            description,
            image,
            price,
            timings,
            specification,
        });

        const result = await SubProduct(newSubProduct).save();
        existingProduct.sub_products.push(result._id);
        await existingProduct.save();

        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding SubProduct: ${error.message}`);
    }
};

const DeleteSubProduct = async (id) => {
    try {
        const Sub_Product = await SubProduct.findById(id);
        const ProductId = Sub_Product.product;

        const result = await SubProduct.findByIdAndDelete(id);

        // Remove the product from the associated category
        const product = await Product.findById(ProductId);
        if (product) {
            product.sub_products.pull(id);
            await product.save();
        }
        await Specification.deleteMany({ sub_product: result._id });
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
