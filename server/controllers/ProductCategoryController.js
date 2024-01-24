const { handleApiResponse } = require('../modules/responseHandler');
const { ViewProductCategory, AddProductCategory, SingleProductCategory, DeleteProductCategory, UpdateProductCategory } = require('../services/ProductCategoryService');
const { idSchema } = require('../validators/Schemas');

// To get All ProductCategorys list
const getAllProductCategorys = async (req, res) => {
    try {
        const { category_name, category_status, createdby, sort, select, page, limit } = req.query;

        const ProductCategory = await ViewProductCategory({ category_name, category_status, createdby, sort, select, page: Number(page) || 1, limit: Number(limit) || 5 });

        if (!ProductCategory || ProductCategory.length === 0) {
            return handleApiResponse(res, 404, 'Category not found');
        }
        handleApiResponse(res, 200, 'Product Categories fetched successfully', {
            categories: ProductCategory,
            nbHits: ProductCategory.length,
        });
    } catch (error) {
        console.log(error);
        handleApiResponse(res, 500, 'An error occurred while fetching the Categories', { error: error.message });
    }
};

// To get Single ProductCategory Details
const getSingleProductCategory = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const ProductCategory = await SingleProductCategory(id);

        if (!ProductCategory) {
            return handleApiResponse(res, 404, 'Category not found');
        }
        handleApiResponse(res, 200, 'Product Category details fetched successfully', {
            category: ProductCategory,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the Category: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: error.issues[0].message });
    }
};

// To Add a ProductCategory to ProductCategorys list
const postSingleProductCategory = async (req, res) => {
    const data = req.body;
    try {
        const savedProductCategory = await AddProductCategory(data);
        handleApiResponse(res, 201, 'Category added successfully', {
            savedProductCategory,
        });
    } catch (error) {
        if (error.message.includes('Category with this name already exists')) {
            handleApiResponse(res, 400, 'Category with this name already exists');
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

// To Delete a Single ProductCategory Details
const deleteSingleProductCategory = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const DeletedCategory = await SingleProductCategory(id);

        if (!DeletedCategory) {
            return handleApiResponse(res, 404, 'Category not found, deletion unsuccessful');
        }

        const formattedDeletedCategory = {
            Name: DeletedCategory.category_name,
            Descriptioon: DeletedCategory.category_description,
        };

        const DeletedCategoryStatus = await DeleteProductCategory(id);

        handleApiResponse(res, 200, 'Category deleted successfully', {
            details: DeletedCategoryStatus,
            deletedCategory: formattedDeletedCategory,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the Category: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

// To Update a Single ProductCategory Details
const updateSingleProductCategory = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateProductCategoryData = req.body;
        const updatedProductCategory = await UpdateProductCategory(id, updateProductCategoryData);

        if (!updatedProductCategory) {
            return handleApiResponse(res, 404, 'Product Category not found, update unsuccessful');
        }
        handleApiResponse(res, 200, 'Product Category updated successfully', {
            updatedCategory: updatedProductCategory,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single Client: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: error.issues[0].message });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'Category Name must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: error.message });
            }
        }
    }
};

module.exports = {
    getAllProductCategorys,
    postSingleProductCategory,
    getSingleProductCategory,
    deleteSingleProductCategory,
    updateSingleProductCategory,
};
