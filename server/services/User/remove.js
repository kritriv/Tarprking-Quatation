const { User } = require('../../models');
const { ObjectId } = require('mongodb');
const DeleteUser = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await User.deleteOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting user: ${error.message}`);
    }
};

module.exports = DeleteUser;
