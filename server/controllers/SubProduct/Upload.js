const { handleApiResponse } = require('../../modules/responseHandler');
const { upload } = require('../../services/SubProduct');
const { idSchema } = require('../../validators/Schemas');

// To Add a SubProduct Image
const Upload = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const file = req.file;
        console.log(req.file);
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

module.exports = Upload;
