const Client = require('../models/ClientModel');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const ViewClient = async ({id, client_status, client_username, client_name, client_email, contact_no, gender, company_name, company_GST_no, sort, select, page = 1, limit = 5 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }

        if (client_status !== undefined) {
            queryObject.client_status = client_status.toLowerCase() === 'true';
        }
        if (client_username) {
            queryObject.client_username = {
                $regex: new RegExp(client_username, 'i'),
            };
        }
        if (client_name) {
            queryObject.client_name = { $regex: new RegExp(client_name, 'i') };
        }
        if (client_email) {
            queryObject.client_email = { $regex: new RegExp(client_email, 'i') };
        }
        if (gender) {
            queryObject.gender = { $regex: new RegExp(gender, 'i') };
        }
        if (company_name) {
            queryObject.company_name = { $regex: new RegExp(company_name, 'i') };
        }
        if (company_GST_no) {
            queryObject.company_GST_no = { $regex: new RegExp(company_GST_no, 'i') };
        }
        if (contact_no) {
            queryObject.contact_no = contact_no;
        }

        let apiData = Client.find(queryObject);

        // ======== Short , Select ======

        if (sort) {
            let sortFix = sort.replace(',', ' ');
            apiData = apiData.sort(sortFix);
        }
        if (select) {
            let selectFix = select.split(',').join(' ');
            apiData = apiData.select(selectFix);
        }

        // ===== Pagination and limits ====

        const skip = (page - 1) * limit;
        apiData = apiData.skip(skip).limit(limit);

        const Clients = await apiData;
        return Clients;
    } catch (error) {
        throw new Error('An error occurred while fetching Clients: ' + error.message);
    }
};

const AddClient = async (data) => {
    try {
        const result = await Client(data).save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding Client: ${error.message}`);
    }
};

const SingleClient = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        const filter = { _id: new ObjectId(id) };
        const result = await Client.findOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single Client: ${error.message}`);
    }
};

const DeleteClient = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        const filter = { _id: new ObjectId(id) };
        const result = await Client.deleteOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting Client: ${error.message}`);
    }
};

const UpdateClient = async (id, updateClientData) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }

        const filter = { _id: id };
        const result = await Client.findByIdAndUpdate(filter, updateClientData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating Client: ${error.message}`);
    }
};

module.exports = {
    ViewClient,
    AddClient,
    SingleClient,
    DeleteClient,
    UpdateClient,
};
