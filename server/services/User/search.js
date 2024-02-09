const { User } = require('../../models');
const { ObjectId } = require('mongodb');
const SingleUser = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await User.findOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single user: ${error.message}`);
    }
};
module.exports = SingleUser;
