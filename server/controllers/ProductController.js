const { ViewProduct, AddProduct, SingleProduct, DeleteProduct, UpdateProduct } = require('../services/ProductService');

// To get All Products List
const getAllProducts = async (req, res) => {
    try {
        const { id, product_id, product_HSN, product_status, admin_create_username, product_name, sub_type, sort, select, page, limit } = req.query;

        const Products = await ViewProduct({
            id,
            product_id,
            product_HSN,
            product_status,
            admin_create_username,
            product_name,
            sub_type,
            sort,
            select,
            page: Number(page) || 1,
            limit: Number(limit) || 5,
        });

        if (!Products || Products.length === 0) {
            return res.status(404).json({
                Status: 'success',
                Message: 'Products not found',
                Products: [],
                nbHits: 0,
            });
        }

        res.status(200).json({
            Status: 'success',
            Message: 'Products fetched successfully',
            Products,
            nbHits: Products.length,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching products',
            error: error.message,
        });
    }
};
// To get Single Product Details
const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const Product = await SingleProduct(id);

        if (!Product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Product details fetched successfully',
            data: Product,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching the single Product',
            error: error.message,
        });
    }
};

// To Delete a Single Product Details
const deleteSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const Product = await DeleteProduct(id);

        if (!Product || Product.deletedCount === 0) {
            return res.status(404).json({ message: 'Product not found, deletion unsuccessful' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Product deleted successfully',
            deletedProduct: Product,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while deleting the single Product',
            error: error.message,
        });
    }
};

// To Add a Product to Products list
const postSingleProduct = async (req, res) => {
    const data = req.body;
    try {
        const savedProduct = await AddProduct(data);
        res.status(201).json({
            status: 'success',
            message: 'Product added successfully',
            savedProduct,
        });
    } catch (error) {
        const duplicateFieldMatches = error.message.match(/[a-zA-Z_]+(?= already exists)/g);
        if (duplicateFieldMatches && duplicateFieldMatches.length > 0) {
            const duplicateFields = duplicateFieldMatches.map(field => field.replace('product_', ''));
            const Error = `Product with ${duplicateFields.join(', ')} is already exists.`;
            res.status(400).json({Message: 'An error occurred while adding the product', Error });
        } else {
            res.status(500).json({ Message: 'An error occurred while adding the product', error: error.message });
        }
    }
};

// To Update a Single Product Details
const updateSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updateProductData = req.body;

        const updatedProduct = await UpdateProduct(id, updateProductData);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found, update unsuccessful' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Product updated successfully',
            updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while updating the single Product',
            error: error.message,
        });
    }
};

module.exports = {
    getAllProducts,
    getSingleProduct,
    postSingleProduct,
    deleteSingleProduct,
    updateSingleProduct,
};
