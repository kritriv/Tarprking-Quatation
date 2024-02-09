const { User } = require('../../models');
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

module.exports = UpdateUser;
