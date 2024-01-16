const User = require('../models/UserModel');
const { ObjectId } = require('mongodb');

const ViewUser = async ({  username, fullname, role, email, sort, select, page = 1, limit = 5 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (email) {
            queryObject.email = { $regex: new RegExp(email, 'i') };
        }
        if (username) {
            queryObject.username = { $regex: new RegExp(username, 'i') };
        }
        if (role) {
            queryObject.role = { $regex: new RegExp(role, 'i') };
        }
        if (fullname) {
            queryObject.fullname = { $regex: new RegExp(fullname, 'i') };
        }

        // ======== Short , Select ======

        let apiData = User.find(queryObject);

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

        const Users = await apiData;
        return Users;
    } catch (error) {
        throw new Error('An error occurred while fetching Users: ' + error.message);
    }
};

const AddUser = async (data) => {
    try {
        const result = await User(data).save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding user: ${error.message}`);
    }
};

const SingleUser = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await User.findOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single user: ${error.message}`);
    }
};

const DeleteUser = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await User.deleteOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting user: ${error.message}`);
    }
};

const UpdateUser = async (id, updateUserData) => {
    try {
        const filter = { _id: id };
        const result = await User.findByIdAndUpdate(filter, updateUserData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating user: ${error.message}`);
    }
};

module.exports = {
    ViewUser,
    AddUser,
    SingleUser,
    DeleteUser,
    UpdateUser,
};
