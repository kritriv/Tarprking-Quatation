const { User } = require('../../models');
const { hashPassword } = require('../../modules/password');

const UpdateUser = async (id, updateUserData) => {
    try {
        const { name, username, password, role } = updateUserData;

        const hashedPassword = await hashPassword(password);
        updateUserData = {
            name,
            username,
            password: hashedPassword,
            role,
        };
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
