const { handleApiResponse } = require('../modules/responseHandler');
const { ViewSubProduct, AddSubProduct, SingleSubProduct, DeleteSubProduct, UpdateSubProduct } = require('../services/SubProductService');
const { idSchema } = require('../validators/Schemas');

// To get All SubProducts list
const getAllSubProducts = async (req, res) => {
    try {
        const SubProducts = await ViewSubProduct(req.query);
        if (!SubProducts || SubProducts.length === 0) {
            return handleApiResponse(res, 404, 'Sub Product not found');
        }
        const formattedSubProduct = SubProducts.map((product) => ({
            SubProductId: product._id,
            Status: product.sub_product_status,
            ModelNo: product.model_no,
            ProductHSN: product.product_HSN,
            CreatedBy: product.createdby.username,
            Name: product.sub_product_name,
            Description: product.sub_product_description,
            ImgURL: product.sub_product_img,
            Category: product.product_category.category_name,
            MainProduct: product.main_product.product_name,
            Prices: {
                Quantity: product.sub_product_price.quantity,
                BasicRate: product.sub_product_price.basic_rate,
                Installation: product.sub_product_price.installation_charges,
                SubTotal: product.sub_product_price.subTotal,
            },
            ManufacturingTime: {
                Dilivery: product.manufacturing_time.delivery_time,
                Installation: product.manufacturing_time.installation_time,
            },
            Specifications: product.product_specification,
        }));

        handleApiResponse(res, 200, 'Sub Products fetched successfully', {
            SubProducts: formattedSubProduct,
            nbHits: SubProducts.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the Sub Products', { error: error.message });
    }
};

// To get Single SubProduct Details
const getSingleSubProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const product = await SingleSubProduct(id);

        if (!product) {
            return handleApiResponse(res, 404, 'Sub Product not found');
        }
        const formattedSubProduct = {
            SubProductId: product._id,
            Status: product.sub_product_status,
            ModelNo: product.model_no,
            ProductHSN: product.product_HSN,
            CreatedBy: product.createdby.username,
            Name: product.sub_product_name,
            Description: product.sub_product_description,
            ImgURL: product.sub_product_img,
            Category: product.product_category.category_name,
            MainProduct: product.main_product.product_name,
            Prices: {
                Quantity: product.sub_product_price.quantity,
                BasicRate: product.sub_product_price.basic_rate,
                Installation: product.sub_product_price.installation_charges,
                SubTotal: product.sub_product_price.subTotal,
            },
            ManufacturingTime: {
                Dilivery: product.manufacturing_time.delivery_time,
                Installation: product.manufacturing_time.installation_time,
            },
            Specifications: product.product_specification,
        };

        handleApiResponse(res, 200, 'Sub Product details fetched successfully', {
            SubProduct: formattedSubProduct,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the Sub Product: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the Sub Product' });
    }
};

// To Add a SubProduct to SubProducts list
const postSingleSubProduct = async (req, res) => {
    const data = req.body;
    try {
        const product = await AddSubProduct(data);
        const formattedSubProduct = {
            SubProductId: product._id,
            Status: product.sub_product_status,
            ModelNo: product.model_no,
            ProductHSN: product.product_HSN,
            CreatedBy: product.createdby.username,
            Name: product.sub_product_name,
            Description: product.sub_product_description,
            ImgURL: product.sub_product_img,
            Category: product.product_category.category_name,
            MainProduct: product.main_product.product_name,
            Prices: {
                Quantity: product.sub_product_price.quantity,
                BasicRate: product.sub_product_price.basic_rate,
                Installation: product.sub_product_price.installation_charges,
                SubTotal: product.sub_product_price.subTotal,
            },
            ManufacturingTime: {
                Dilivery: product.manufacturing_time.delivery_time,
                Installation: product.manufacturing_time.installation_time,
            },
            Specifications: product.product_specification,
        };

        handleApiResponse(res, 201, 'Sub Product added successfully', {
            SubProductDetail: formattedSubProduct,
        });
    } catch (error) {
        const duplicateFieldMatches = error.message.match(/[a-zA-Z_]+(?= already exists)/g);
        if (duplicateFieldMatches && duplicateFieldMatches.length > 0) {
            const duplicateFields = duplicateFieldMatches.map((field) => field.replace('sub_product_', ''));
            const errorMessage = `Sub Product with ${duplicateFields.join(', ')} already exists.`;
            handleApiResponse(res, 400, errorMessage, { error: error.message });
        } else {
            handleApiResponse(res, 500, 'An error occurred while adding the Sub Product', { error: error.message });
        }
    }
};

// To Delete a Single SubProduct Details
const deleteSingleSubProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const product = await SingleSubProduct(id);

        if (!product) {
            return handleApiResponse(res, 404, 'Sub Product not found, deletion unsuccessful');
        }

        const formattedSubProduct = {
            SubProductId: product._id,
            Status: product.sub_product_status,
            ModelNo: product.model_no,
            ProductHSN: product.product_HSN,
            Name: product.sub_product_name,
            Description: product.sub_product_description,
            Category: product.product_category.category_name,
            MainProduct: product.main_product.product_name,
        };

        const SubProductStatus = await DeleteSubProduct(id);

        handleApiResponse(res, 200, 'Sub Product deleted successfully', {
            Details: SubProductStatus,
            DeletedSubProduct: formattedSubProduct,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the Category: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

// To Update a Single SubProduct Details
const updateSingleSubProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateSubProductData = req.body;
        const product = await UpdateSubProduct(id, updateSubProductData);

        if (!product) {
            return handleApiResponse(res, 404, 'Sub Product not found, update unsuccessful');
        }
        const formattedSubProduct = {
            SubProductId: product._id,
            Status: product.sub_product_status,
            ModelNo: product.model_no,
            ProductHSN: product.product_HSN,
            CreatedBy: product.createdby.username,
            Name: product.sub_product_name,
            Description: product.sub_product_description,
            ImgURL: product.sub_product_img,
            Category: product.product_category.category_name,
            MainProduct: product.main_product.product_name,
            Prices: {
                Quantity: product.sub_product_price.quantity,
                BasicRate: product.sub_product_price.basic_rate,
                Installation: product.sub_product_price.installation_charges,
                SubTotal: product.sub_product_price.subTotal,
            },
            ManufacturingTime: {
                Dilivery: product.manufacturing_time.delivery_time,
                Installation: product.manufacturing_time.installation_time,
            },
            Specifications: product.product_specification,
        };

        handleApiResponse(res, 200, 'Sub Product updated successfully', {
            UpdatedSubProduct: formattedSubProduct,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single Client: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'Internal Server Error' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'Sub Product must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = {
    getAllSubProducts,
    postSingleSubProduct,
    getSingleSubProduct,
    deleteSingleSubProduct,
    updateSingleSubProduct,
};

