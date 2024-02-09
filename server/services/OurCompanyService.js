const { Company } = require('../models');
const { ObjectId } = require('mongodb');
const { limitOffsetPageNumber } = require('../utils/pagination');

const ViewOurCompany = async ({ id, sort, select, page = 1, size = 10 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }

        // ======== Short , Select ======

        let apiData = Company.find(queryObject);

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

        const OurCompanys = await apiData;

        return OurCompanys;
    } catch (error) {
        throw new Error('An error occurred while fetching OurCompanys: ' + error.message);
    }
};

const SingleOurCompany = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Company.findOne(filter);

        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single OurCompany: ${error.message}`);
    }
};

const AddOurCompany = async ({ name, emails, websites, phones, cin_no, tan_no, pan_no, gst_no, address, bank_details }) => {
    try {
        const newOurCompany = new Company({
            name,
            emails,
            websites,
            phones,
            cin_no,
            tan_no,
            pan_no,
            gst_no,
            address,
            bank_details,
        });

        const result = await Company(newOurCompany).save();

        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding OurCompany: ${error.message}`);
    }
};

const DeleteOurCompany = async (id) => {
    try {
        const result = await Company.findByIdAndDelete(id);

        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting OurCompany: ${error.message}`);
    }
};

const UpdateOurCompany = async (id, updateOurCompanyData) => {
    try {
        const filter = { _id: id };
        const result = await Company.findByIdAndUpdate(filter, updateOurCompanyData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating OurCompany: ${error.message}`);
    }
};

module.exports = {
    ViewOurCompany,
    AddOurCompany,
    SingleOurCompany,
    DeleteOurCompany,
    UpdateOurCompany,
};
