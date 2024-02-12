const { handleApiResponse } = require('../../modules/responseHandler');
const { upload } = require('../../services/Quotation');
const { idSchema } = require('../../validators/Schemas');

const Upload = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const file = req.file;
        if (!file) {
            return handleApiResponse(res, 400, 'No file uploaded. Please provide a valid image file.');
        }
        const subProduct = await upload(id, file);

        handleApiResponse(res, 201, 'Quote back image added successfully', {
            data: subProduct,
        });
    } catch (error) {
        console.log(error);
        const errorMessage = error.message.includes('Invalid ID format')
            ? 'Provide valid Quote Id'
            : error.message.includes('Invalid file type. Only images are allowed')
            ? 'Only images are allowed'
            : `An error occurred while updating the quote back img: ${error.message}`;

        if (errorMessage === 'Provide valid Quote Id' || errorMessage === 'Only images are allowed') {
            handleApiResponse(res, 400, errorMessage);
        } else {
            if (error.message.includes('Quote not found')) {
                handleApiResponse(res, 404, 'Quote not found', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = Upload;
