const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/Client');
// To get All Clients List
const ListAll = async (req, res) => {
    try {
        const Clients = await list(req.query);

        if (!Clients || Clients.length === 0) {
            return handleApiResponse(res, 404, 'Client Not found');
        }

        const formattedClients = Clients.map((Client) => ({
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
        }));

        handleApiResponse(res, 200, 'Client details fetched successfully', {
            data: formattedClients,
            nbHits: Clients.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the Clients Data', { error: error.message });
    }
};

module.exports = ListAll;
