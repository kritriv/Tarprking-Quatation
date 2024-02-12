const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/Client');
// To Add a Client to Clients list
const CreateItem = async (req, res) => {
    const data = req.body;
    try {
        const Client = await create(data);

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

        handleApiResponse(res, 201, 'Client added successfully', {
            data: formattedClient,
        });
    } catch (error) {
        const duplicateFieldMatches = error.message.match(/[a-zA-Z_]+(?= already exists)/g);
        if (duplicateFieldMatches && duplicateFieldMatches.length > 0) {
            const duplicateFields = duplicateFieldMatches.map((field) => field.replace('Client_', ''));
            const errorMessage = `Client with ${duplicateFields.join(', ')} is already exist.`;
            handleApiResponse(res, 400, errorMessage, { error: 'An error occurred while adding the Client' });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};

module.exports = CreateItem;
