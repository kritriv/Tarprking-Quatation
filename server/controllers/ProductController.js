const { handleApiResponse } = require('../modules/responseHandler');
// const { ViewProduct, AddProduct, SingleProduct, DeleteProduct, UpdateProduct } = require('../services/ProductService');
const { create, list, search, remove, update } = require('../services/Product');
const { idSchema } = require('../validators/Schemas');

// To get All Products List
const getAllProducts = async (req, res) => {
    try {
        const Products = await list(req.query);

        if (!Products || Products.length === 0) {
            return handleApiResponse(res, 404, 'Products not found');
        }

        const formattedProduct = Products.map((product) => ({
            id: product._id,
            status: product.status,
            createdby: product.createdby ? product.createdby.username : null,
            name: product.name,
            description: product.description,
            category: product.category ? product.category.name : null,
            subproducts: product.sub_products.map((subproduct) => ({
                id: subproduct._id,
                name: subproduct.name,
            })),
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
        const Product = await search(id);

        if (!Product) {
            return handleApiResponse(res, 404, 'Product not found');
        }
        const formattedProduct = {
            id: Product._id,
            status: Product.status,
            createdby: Product.createdby ? Product.createdby.username : null,
            name: Product.name,
            description: Product.description,
            category: Product.category ? Product.category.name : null,
            subproducts: Product.sub_products.map((subproduct) => ({
                id: subproduct._id,
                name: subproduct.name,
            })),
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
        const Product = await create(req.body);
        const formattedProduct = {
            id: Product._id,
            status: Product.status,
            createdby: Product.createdby ? Product.createdby.username : null,
            name: Product.name,
            description: Product.description,
            category: Product.category ? Product.category.name : null,
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
        } else if (error.message.includes('User not found')) {
            handleApiResponse(res, 404, 'User not found', { error: error.message });
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

        const DeletedProduct = await search(id);

        if (!DeletedProduct) {
            return handleApiResponse(res, 404, 'Product not found, deletion unsuccessful');
        }

        const DeletedProductRes = await remove(id);

        const formattedProduct = {
            id: DeletedProductRes._id,
            name: DeletedProductRes.name,
            description: DeletedProductRes.description,
        };
        handleApiResponse(res, 200, 'Product deleted successfully', {
            deleted: formattedProduct,
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

        const updatedProduct = await update(id, updateProductData);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found, update unsuccessful' });
        }
        const formattedProduct = {
            id: Product._id,
            status: Product.status,
            createdby: Product.createdby ? Product.createdby.username : null,
            name: Product.name,
            description: Product.description,
            category: Product.category ? Product.category.name : null,
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
