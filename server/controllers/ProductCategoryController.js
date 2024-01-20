const { ViewProductCategory, AddProductCategory, SingleProductCategory, DeleteProductCategory, UpdateProductCategory } = require('../services/ProductCategoryService');

// To get All ProductCategorys list
const getAllProductCategorys = async (req, res) => {
    try {
        const { category_name, category_status, sort, select, page, limit } = req.query;

        const ProductCategorys = await ViewProductCategory({ category_name, category_status, sort, select, page: Number(page) || 1, limit: Number(limit) || 5 });

        if (!ProductCategorys || ProductCategorys.length === 0) {
            return res.status(404).json({
                Status: 'success',
                Message: 'ProductCategorys Not found',
                ProductCategorys: [],
                nbHits: 0,
            });
        }

        res.status(200).json({
            Status: 'success',
            Message: 'ProductCategorys fetched successfully',
            ProductCategorys,
            nbHits: ProductCategorys.length,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching ProductCategorys',
            error: error.message,
        });
    }
};

// To get Single ProductCategory Details
const getSingleProductCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const ProductCategory = await SingleProductCategory(id);

        if (!ProductCategory) {
            return res.status(404).json({ message: 'ProductCategory not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'ProductCategory details fetched successfully',
            data: ProductCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching the single ProductCategory',
            error: error.message,
        });
    }
};

// To Add a ProductCategory to ProductCategorys list
const postSingleProductCategory = async (req, res) => {
    const data = req.body;
    try {
        const savedProductCategory = await AddProductCategory(data);
        res.status(201).json({
            status: 'success',
            message: 'ProductCategory added successfully',
            savedProductCategory,
        });
    } catch (error) {
        if (error.message.includes('Category with this name already exists')) {
            res.status(400).json({
                status: 'fail',
                error: `${error.message}`,
                message: 'Category with this name already exists',
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: `An error occurred while adding the ProductCategory: ${error.message}`,
            });
        }
    }
};

// To Delete a Single ProductCategory Details
const deleteSingleProductCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const ProductCategory = await DeleteProductCategory(id);

        if (!ProductCategory || ProductCategory.deletedCount === 0) {
            return res.status(404).json({ message: 'ProductCategory not found, deletion unsuccessful' });
        }

        res.status(200).json({
            status: 'success',
            message: 'ProductCategory deleted successfully',
            deletedProductCategory: ProductCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while deleting the single ProductCategory',
            error: error.message,
        });
    }
};

// To Update a Single ProductCategory Details
const updateSingleProductCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const updateProductCategoryData = req.body;

        const updatedProductCategory = await UpdateProductCategory(id, updateProductCategoryData);

        if (!updatedProductCategory) {
            return res.status(404).json({ status: 'fail', message: 'Product Category not found'  });
        }

        res.status(200).json({
            status: 'success',
            message: 'ProductCategory updated successfully',
            updatedProductCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while updating the single ProductCategory',
            error: error.message,
        });
    }
};

module.exports = {
    getAllProductCategorys,
    postSingleProductCategory,
    getSingleProductCategory,
    deleteSingleProductCategory,
    updateSingleProductCategory,
};
