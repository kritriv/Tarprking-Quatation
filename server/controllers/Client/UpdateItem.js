const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/Client');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single Client Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateClientData = req.body;
        const Client = await update(id, updateClientData);

        if (!Client) {
            return handleApiResponse(res, 404, `Client not found with id: ${id} ! Updation unsuccessful`);
        }
        const formattedClient = {
            id: Client._id,
            status: Client.status,
            username: Client.username,
            createdby: Client.createdby.username,
            name: Client.name,
            email: Client.email,
            phone: Client.phone,
            gender: Client.gender,
            age: Client.age,
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
        handleApiResponse(res, 200, 'Client updated successfully', {
            data: formattedClient,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single Client: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'Internal Server Error' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'Client Username must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: error.message });
            }
        }
    }
};

module.exports = UpdateItem;
