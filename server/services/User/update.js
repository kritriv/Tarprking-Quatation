const { User } = require('../../models');
const { hashPassword } = require('../../modules/password');

const UpdateUser = async (id, updateUserData) => {
    try {
        const { name, username, email, password, role } = updateUserData;

        if (password) {
            const hashedPassword = await hashPassword(password);
            updateUserData.password = hashedPassword;
        }

        const updateQuery = { name, email, username, role, password };
        if (!password) {
            delete updateQuery.password;
        }

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
