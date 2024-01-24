const Client = require('../models/ClientModel');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { limitOffsetPageNumber } = require('../utils/pagination');

const ViewClient = async ({ ClientId, CreatedBy, Status, ClientUsername, ClientName, ClientEmail, ContactNo, Gender, CompanyName, GST, City, Pincode, State, Country, sort, select, page = 1, size = 10 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (ClientId) {
            queryObject._id = ClientId;
        }
        if (CreatedBy) {
            queryObject.createdby = CreatedBy;
        }
        if (Status !== undefined) {
            queryObject.client_status = Status.toLowerCase() === 'true';
        }
        if (ClientUsername) {
            queryObject.client_username = {
                $regex: new RegExp(ClientUsername, 'i'),
            };
        }
        if (ClientName) {
            queryObject.client_name = { $regex: new RegExp(ClientName, 'i') };
        }
        if (ClientEmail) {
            queryObject.client_email = { $regex: new RegExp(ClientEmail, 'i') };
        }
        if (ContactNo) {
            queryObject.contact_no = ContactNo;
        }
        if (Gender) {
            queryObject.gender = { $regex: new RegExp(Gender, 'i') };
        }
        if (CompanyName) {
            queryObject.company_name = { $regex: new RegExp(CompanyName, 'i') };
        }
        if (GST) {
            queryObject.company_GST_no = { $regex: new RegExp(GST, 'i') };
        }
        if (City) {
            queryObject['client_address.City'] = { $regex: new RegExp(City, 'i') };
        }
        if (Pincode) {
            queryObject['client_address.pincode'] = Pincode;
        }
        if (State) {
            queryObject['client_address.State'] = { $regex: new RegExp(State, 'i') };
        }
        if (Country) {
            queryObject['client_address.country'] = { $regex: new RegExp(Country, 'i') };
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

        const { limit, offset } = limitOffsetPageNumber(page, size);
        apiData = apiData.skip(offset).limit(limit);

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
