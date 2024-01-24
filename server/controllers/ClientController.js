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

        const formattedClients = Clients.map((client) => ({
            ClientId: client._id,
            CreatedBy: client.createdby.username,
            Status: client.client_status,
            ClientUsername: client.client_username,
            ClientName: client.client_name,
            ClientEmail: client.client_email,
            ContactNo: client.contact_no,
            Gender: client.gender,
            Age: client.age,
            SiteAddress: client.site_address,
            CompanyName: client.company_name,
            GST: client.company_GST_no,
            ClientAddress: {
                Street: client.client_address.street,
                City: client.client_address.City,
                State: client.client_address.State,
                Pincode: client.client_address.pincode,
                Country: client.client_address.country,
            },
        }));

        handleApiResponse(res, 200, 'Client details fetched successfully', {
            Clients: formattedClients,
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
            ClientId: Client._id,
            CreatedBy: Client.createdby.username,
            Status: Client.client_status,
            ClientUsername: Client.client_username,
            ClientName: Client.client_name,
            ClientEmail: Client.client_email,
            ContactNo: Client.contact_no,
            Gender: Client.gender,
            Age: Client.age,
            SiteAddress: Client.site_address,
            CompanyName: Client.company_name,
            GST: Client.company_GST_no,
            ClientAddress: {
                Street: Client.client_address.street,
                City: Client.client_address.City,
                State: Client.client_address.State,
                Pincode: Client.client_address.pincode,
                Country: Client.client_address.country,
            },
        };

        handleApiResponse(res, 200, 'Client details fetched successfully', {
            Clients: formattedClient,
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
            ClientId: Client._id,
            CreatedBy: Client.createdby.username,
            ClientUsername: Client.client_username,
            ClientName: Client.client_name,
            ClientEmail: Client.client_email,
            ContactNo: Client.contact_no,
            CompanyName: Client.company_name,
            GST: Client.company_GST_no,
        };

        handleApiResponse(res, 201, 'Client added successfully', {
            CreatedClient: formattedClient,
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
        const DeletedClient = await SingleClient(id);

        if (!DeletedClient) {
            return handleApiResponse(res, 404, 'Client not found, deletion unsuccessful');
        }
        const formattedDeletedClient = {
            username: DeletedClient.client_username,
            ClientName: DeletedClient.client_name,
            ClientEmail: DeletedClient.client_email,
            ClientContact: DeletedClient.contact_no,
            CompanyName: DeletedClient.company_name,
        };

        const DeletedClientStatus = await DeleteClient(id);

        handleApiResponse(res, 200, 'Client deleted successfully', {
            details: DeletedClientStatus,
            DeletedClient: formattedDeletedClient,
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
        const updatedClient = await UpdateClient(id, updateClientData);

        if (!updatedClient) {
            return handleApiResponse(res, 404, 'Client not found, update unsuccessful');
        }
        const formattedClient = {
            ClientId: Client._id,
            CreatedBy: Client.createdby.username,
            ClientUsername: Client.client_username,
            ClientName: Client.client_name,
            ClientEmail: Client.client_email,
            ContactNo: Client.contact_no,
            CompanyName: Client.company_name,
            GST: Client.company_GST_no,
        };
        handleApiResponse(res, 200, 'Client updated successfully', {
            updatedclient: formattedClient,
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
