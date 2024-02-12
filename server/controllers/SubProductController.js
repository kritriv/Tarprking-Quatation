const { handleApiResponse } = require('../modules/responseHandler');
// const { ViewSubProduct, AddSubProduct, SingleSubProduct, DeleteSubProduct, UpdateSubProduct, AddSubProductImg } = require('../services/SubProductService');
const { create, list, search, remove, update, upload } = require('../services/SubProduct');
const { idSchema } = require('../validators/Schemas');

// To get All SubProducts list
const ListAll = async (req, res) => {
    try {
        const SubProducts = await list(req.query);
        if (!SubProducts || SubProducts.length === 0) {
            return handleApiResponse(res, 404, 'Sub Product not found');
        }

        const formattedSubProduct = SubProducts.map((SubProduct) => ({
            id: SubProduct._id,
            status: SubProduct.status,
            createdby: SubProduct.createdby ? SubProduct.createdby.username : null,
            category: SubProduct.category ? SubProduct.category.name : null,
            main_product: SubProduct.product ? SubProduct.product.name : null,
            model: SubProduct.model_no,
            hsn: SubProduct.hsn,
            name: SubProduct.name,
            description: SubProduct.description,
            image: SubProduct.image,
            price: {
                basic_rate: SubProduct.price.basic_rate,
                installation_charges: SubProduct.price.installation_charges,
                subTotal: SubProduct.price.subTotal,
            },
            timings: {
                delivery_time: SubProduct.timings.delivery_time,
                installation_time: SubProduct.timings.installation_time,
            },
            specifications: SubProduct.specifications ? SubProduct.specifications : null,
            tnc: SubProduct.tnc ? SubProduct.tnc : null,
        }));

        handleApiResponse(res, 200, 'Sub Products fetched successfully', {
            data: formattedSubProduct,
            nbHits: SubProducts.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the Sub Products', { error: error.message });
    }
};

// To get Single SubProduct Details
const ReadItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const SubProduct = await search(id);

        if (!SubProduct) {
            return handleApiResponse(res, 404, 'Sub Product not found');
        }
        const formattedSubProduct = {
            id: SubProduct._id,
            status: SubProduct.status,
            createdby: SubProduct.createdby ? SubProduct.createdby.username : null,
            category: SubProduct.category ? SubProduct.category.name : null,
            main_product: SubProduct.product ? SubProduct.product.name : null,
            model: SubProduct.model_no,
            hsn: SubProduct.hsn,
            name: SubProduct.name,
            description: SubProduct.description,
            image: SubProduct.image,
            price: {
                basic_rate: SubProduct.price.basic_rate,
                installation_charges: SubProduct.price.installation_charges,
                subTotal: SubProduct.price.subTotal,
            },
            timings: {
                delivery_time: SubProduct.timings.delivery_time,
                installation_time: SubProduct.timings.installation_time,
            },
            specifications: SubProduct.specifications ? SubProduct.specifications : null,
            tnc: SubProduct.tnc ? SubProduct.tnc : null,
        };

        handleApiResponse(res, 200, 'Sub Product details fetched successfully', {
            data: formattedSubProduct,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the Sub Product: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the Sub Product' });
    }
};

// To Add a SubProduct to SubProducts list
const CreateItem = async (req, res) => {
    try {
        const SubProduct = await create(req.body);

        const formattedSubProduct = {
            id: SubProduct._id,
            status: SubProduct.status,
            createdby: SubProduct.createdby ? SubProduct.createdby.username : null,
            category: SubProduct.category ? SubProduct.category.name : null,
            main_product: SubProduct.product ? SubProduct.product.name : null,
            model: SubProduct.model_no,
            hsn: SubProduct.hsn,
            name: SubProduct.name,
            description: SubProduct.description,
            image: SubProduct.image,
            price: {
                basic_rate: SubProduct.price.basic_rate,
                installation_charges: SubProduct.price.installation_charges,
                subTotal: SubProduct.price.subTotal,
            },
            timings: {
                delivery_time: SubProduct.timings.delivery_time,
                installation_time: SubProduct.timings.installation_time,
            },
            specifications: SubProduct.specifications ? SubProduct.specifications : null,
            tnc: SubProduct.tnc ? SubProduct.tnc : null,
        };

        handleApiResponse(res, 201, 'Sub Product added successfully', {
            data: formattedSubProduct,
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
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const SubProduct = await search(id);

        if (!SubProduct) {
            return handleApiResponse(res, 404, 'Sub Product not found, deletion unsuccessful');
        }

        const SubProductRes = await remove(id);

        const formattedSubProduct = {
            id: SubProductRes._id,
            status: SubProductRes.status,
            model: SubProductRes.model_no,
            hsn: SubProductRes.hsn,
            name: SubProductRes.name,
            description: SubProductRes.description,
        };

        handleApiResponse(res, 200, 'Sub Product deleted successfully', {
            deleted: formattedSubProduct,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the Category: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

// To Update a Single SubProduct Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateSubProductData = req.body;
        const SubProduct = await update(id, updateSubProductData);

        if (!SubProduct) {
            return handleApiResponse(res, 404, 'Sub Product not found, update unsuccessful');
        }
        const formattedSubProduct = {
            id: SubProduct._id,
            status: SubProduct.status,
            createdby: SubProduct.createdby ? SubProduct.createdby.username : null,
            category: SubProduct.category ? SubProduct.category.name : null,
            main_product: SubProduct.product ? SubProduct.product.name : null,
            model: SubProduct.model_no,
            hsn: SubProduct.hsn,
            name: SubProduct.name,
            description: SubProduct.description,
            image: SubProduct.image,
            price: {
                basic_rate: SubProduct.price.basic_rate,
                installation_charges: SubProduct.price.installation_charges,
                subTotal: SubProduct.price.subTotal,
            },
            timings: {
                delivery_time: SubProduct.timings.delivery_time,
                installation_time: SubProduct.timings.installation_time,
            },
            specifications: SubProduct.specifications ? SubProduct.specifications : null,
            tnc: SubProduct.tnc ? SubProduct.tnc : null,
        };

        handleApiResponse(res, 200, 'Sub Product updated successfully', {
            data: formattedSubProduct,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single Sub Product: ${error.message}`;
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

// To Add a SubProduct Image
const Upload = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const file = req.file;
        console.log(req.file)
        if (!file) {
            return handleApiResponse(res, 400, 'No file uploaded. Please provide a valid image file.');
        }
        const subProduct = await upload(id, file);

        handleApiResponse(res, 201, 'Sub Product image added successfully', {
            data: subProduct,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format')
            ? 'Provide valid Sub Product Id'
            : error.message.includes('Invalid file type. Only images are allowed')
            ? 'Only images are allowed'
            : `An error occurred while updating the single Sub Product: ${error.message}`;

        if (errorMessage === 'Provide valid Sub Product Id' || errorMessage === 'Only images are allowed') {
            handleApiResponse(res, 400, errorMessage);
        } else {
            if (error.message.includes('Sub product not found')) {
                handleApiResponse(res, 404, 'Sub product not found', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = {
    ListAll,
    CreateItem,
    ReadItem,
    RemoveItem,
    UpdateItem,
    Upload
};
