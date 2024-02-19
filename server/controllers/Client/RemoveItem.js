const { handleApiResponse } = require('../../modules/responseHandler');
const { search, remove } = require('../../services/Client');
const { idSchema } = require('../../validators/Schemas');

// To Delete a Single Client Details
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const Client = await search(id);

        if (!Client) {
            return handleApiResponse(res, 404, `Client not found with id: ${id} ! Deletion unsuccessful`);
        }
        const ClientRes = await remove(id);

        const formattedClient = {
            id: ClientRes._id,
            username: ClientRes.username,
            createdby: ClientRes.createdby.username,
            name: ClientRes.name,
            email: ClientRes.email,
            phone: ClientRes.phone,
            company: ClientRes.company,
            gst: ClientRes.gst,
        };

        handleApiResponse(res, 200, 'Client deleted successfully', {
            deleted: formattedClient,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the single Client: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

module.exports = RemoveItem;
