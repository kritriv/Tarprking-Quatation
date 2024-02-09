const { User } = require('../../models');
const AddUser = async (data) => {
    try {
        const result = await User(data).save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding user: ${error.message}`);
    }
};

module.exports = AddUser;
