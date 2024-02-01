const Client = require('../models/ClientModel');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const { limitOffsetPageNumber } = require('../utils/pagination');

const ViewClient = async ({ id, createdby, status, username, name, email, phone, gender, company, gst, city, pincode, state, country, sort, select, page = 1, size = 10 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }
        if (status !== undefined) {
            queryObject.status = status.toLowerCase() === 'true';
        }
        if (username) {
            queryObject.username = { $regex: new RegExp(username, 'i') };
        }
        if (createdby) {
            queryObject.createdby = createdby;
        }
        if (name) {
            queryObject.name = { $regex: new RegExp(name, 'i') };
        }
        if (email) {
            queryObject.email = { $regex: new RegExp(email, 'i') };
        }
        if (phone) {
            queryObject.contact_no = { $regex: new RegExp(phone, 'i') };
        }
        if (gender) {
            queryObject.gender = { $regex: new RegExp(gender, 'i') };
        }
        if (company) {
            queryObject.company = { $regex: new RegExp(company, 'i') };
        }
        if (gst) {
            queryObject.gst = { $regex: new RegExp(gst, 'i') };
        }
        if (city) {
            queryObject['address.city'] = { $regex: new RegExp(city, 'i') };
        }
        if (pincode) {
            queryObject['address.pincode'] = pincode;
        }
        if (state) {
            queryObject['address.state'] = { $regex: new RegExp(state, 'i') };
        }
        if (country) {
            queryObject['address.country'] = { $regex: new RegExp(country, 'i') };
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
        const result = await Client.findByIdAndDelete(filter);
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
