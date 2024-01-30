const { handleApiResponse } = require('../modules/responseHandler');
const { ViewProduct, AddProduct, SingleProduct, DeleteProduct, UpdateProduct } = require('../services/ProductService');
const { idSchema } = require('../validators/Schemas');

// To get All Products List
const getAllProducts = async (req, res) => {
    try {
        const Products = await ViewProduct(req.query);

        if (!Products || Products.length === 0) {
            return handleApiResponse(res, 404, 'Products not found');
        }

        const formattedProduct = Products.map((product) => ({
            ProductId: product._id,
            Status: product.product_status,
            CreatedBy: product.createdby.username,
            Name: product.product_name,
            Description: product.product_description,
            Category: product.category.category_name,
            SubProducts: product.sub_products,
        }));

        handleApiResponse(res, 200, 'Products  fetched successfully', {
            data: formattedProduct,
            nbHits: Products.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the Products', { error: error.message });
    }
};
// To get Single Product Details
const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const Product = await SingleProduct(id);

        if (!Product) {
            return handleApiResponse(res, 404, 'Product not found');
        }
        const formattedProduct = {
            ProductId: Product._id,
            Status: Product.product_status,
            CreatedBy: Product.createdby.username,
            Name: Product.product_name,
            Description: Product.product_description,
            Category: Product.category.category_name,
            SubProducts: Product.sub_products,
        };

        handleApiResponse(res, 200, 'Product  details fetched successfully', {
            data: formattedProduct,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the Product: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the Product' });
    }
};

// To Add a Product to Products list
const postSingleProduct = async (req, res) => {
    try {
        const product = await AddProduct(req.body);

        const formattedProduct = {
            ProductId: product._id,
            Status: product.product_status,
            CreatedBy: product.createdby.username,
            Name: product.product_name,
            Description: product.product_description,
            Category: product.category.category_name,
            SubProducts: product.sub_products,
        };

        handleApiResponse(res, 201, 'Product added successfully', {
            data: formattedProduct,
        });
    } catch (error) {
        const duplicateFieldMatches = error.message.match(/[a-zA-Z_]+(?= already exists)/g);
        if (duplicateFieldMatches && duplicateFieldMatches.length > 0) {
            const duplicateFields = duplicateFieldMatches.map((field) => field.replace('product_', ''));
            const errorMessage = `Product with ${duplicateFields.join(', ')} is already exists.`;
            handleApiResponse(res, 400, errorMessage, error);
        } else if (error.message.includes('Category not found')) {
            handleApiResponse(res, 404, 'Category not found', { error: error.message });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

// To Delete a Single Product Details
const deleteSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const DeletedProduct = await SingleProduct(id);

        if (!DeletedProduct) {
            return handleApiResponse(res, 404, 'Product not found, deletion unsuccessful');
        }

        const DeletedProductRes = await DeleteProduct(id);

        const formattedProduct = {
            Name: DeletedProductRes.product_name,
            Description: DeletedProductRes.product_description,
        };
        handleApiResponse(res, 200, 'Product deleted successfully', {
            data: formattedProduct,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the Product: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

// To Update a Single Product Details
const updateSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const updateProductData = req.body;

        const updatedProduct = await UpdateProduct(id, updateProductData);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found, update unsuccessful' });
        }
        const formattedProduct = {
            ProductId: updatedProduct._id,
            Status: updatedProduct.product_status,
            CreatedBy: updatedProduct.createdby.username,
            Name: updatedProduct.product_name,
            Description: updatedProduct.product_description,
            Category: product.category,
            SubProducts: updatedProduct.sub_products,
        };

        handleApiResponse(res, 200, 'Product updated successfully', {
            data: formattedProduct,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single Product: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'Internal Server Error' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'Product Name must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = {
    getAllProducts,
    getSingleProduct,
    postSingleProduct,
    deleteSingleProduct,
    updateSingleProduct,
};
