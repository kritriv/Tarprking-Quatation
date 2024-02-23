const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/Client');
const { idSchema } = require('../../validators/Schemas');

// To get Single Client Details
const ReadItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const Client = await search(id);

        if (!Client) {
            return handleApiResponse(res, 404, `Client not found with id: ${id}`);
        }

        const formattedClient = {
            id: Client._id,
            status: Client.status,
            username: Client.username,
            createdby: Client.createdby.username,
            name: Client.name,
            email: Client.email,
            phone: Client.phone,
            company: Client.company,
            gst: Client.gst,
            address: {
                site: Client.address.site,
                street: Client.address.street,
                city: Client.address.city,
                state: Client.address.state,
                pincode: Client.address.pincode,
                country: Client.address.country,
            },
        };

        handleApiResponse(res, 200, 'Client details fetched successfully', {
            data: formattedClient,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the single Client: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

module.exports = ReadItem;
