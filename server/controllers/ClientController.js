const { handleApiResponse } = require('../modules/responseHandler');
const { ViewClient, AddClient, SingleClient, DeleteClient, UpdateClient } = require('../services/ClientService');

const { idSchema } = require('../validators/Schemas');

// To get All Clients List
const getAllClients = async (req, res) => {
    try {
        const { id, client_status, client_username, client_name, email, contact_no, gender, company_name, company_GST_no, sort, select, page, limit } = req.query;

        const Client = await ViewClient({
            id,
            client_status,
            client_username,
            client_name,
            email,
            contact_no,
            gender,
            company_name,
            company_GST_no,
            sort,
            select,
            page: Number(page) || 1,
            limit: Number(limit) || 5,
        });

        if (!Client || Client.length === 0) {
            return handleApiResponse(res, 404, 'Client Not found');
        }
        handleApiResponse(res, 200, 'Client details fetched successfully', {
            Clients: Client,
            nbHits: Client.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the single Client', { error: error.message });
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

        handleApiResponse(res, 200, 'Client details fetched successfully', {
            Clients: Client,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the single Client: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: error.issues[0].message });
    }
};

// To Delete a Single Client Details
const deleteSingleClient = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const DeletedClient = await SingleClient(id);
        const DeletedClientStatus = await DeleteClient(id);

        if (!DeletedClient) {
            return handleApiResponse(res, 404, 'Client not found, deletion unsuccessful');
        }

        handleApiResponse(res, 200, 'Client deleted successfully', {
            details: DeletedClientStatus,
            deletedclient: DeletedClient,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the single Client: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: error.issues[0].message });
    }
};

// To Add a Client to Clients list
const postSingleClient = async (req, res) => {
    const data = req.body;
    try {
        const Client = await AddClient(data);
        handleApiResponse(res, 201, 'Client added successfully', {
            Client,
        });
    } catch (error) {
        const duplicateFieldMatches = error.message.match(/[a-zA-Z_]+(?= already exists)/g);
        if (duplicateFieldMatches && duplicateFieldMatches.length > 0) {
            const duplicateFields = duplicateFieldMatches.map((field) => field.replace('Client_', ''));
            const errorMessage = `Client with ${duplicateFields.join(', ')} is already exist.`;
            handleApiResponse(res, 400, 'An error occurred while adding the Client', { error: errorMessage });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
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
        handleApiResponse(res, 200, 'Client updated successfully', {
            updatedclient: updatedClient,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single Client: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: error.issues[0].message });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'client_username must be unique', { error: error.message });
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
