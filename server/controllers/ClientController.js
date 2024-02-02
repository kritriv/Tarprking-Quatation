const { handleApiResponse } = require('../modules/responseHandler');
const { ViewClient, AddClient, SingleClient, DeleteClient, UpdateClient } = require('../services/ClientService');

const { idSchema } = require('../validators/Schemas');

// To get All Clients List
const getAllClients = async (req, res) => {
    try {
        const Clients = await ViewClient(req.query);

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

// To get Single Client Details
const getSingleClient = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const Client = await SingleClient(id);

        if (!Client) {
            return handleApiResponse(res, 404, 'Client not found');
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

        handleApiResponse(res, 200, 'Client details fetched successfully', {
            data: formattedClient,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the single Client: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

// To Add a Client to Clients list
const postSingleClient = async (req, res) => {
    const data = req.body;
    try {
        const Client = await AddClient(data);

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

// To Delete a Single Client Details
const deleteSingleClient = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const Client = await SingleClient(id);

        if (!Client) {
            return handleApiResponse(res, 404, 'Client not found, deletion unsuccessful');
        }
        const ClientRes = await DeleteClient(id);

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

// To Update a Single Client Details
const updateSingleClient = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateClientData = req.body;
        const Client = await UpdateClient(id, updateClientData);

        if (!Client) {
            return handleApiResponse(res, 404, 'Client not found, update unsuccessful');
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

module.exports = {
    getAllClients,
    getSingleClient,
    postSingleClient,
    deleteSingleClient,
    updateSingleClient,
};
