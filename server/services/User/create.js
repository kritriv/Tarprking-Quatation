const { User } = require('../../models');
const AddUser = async ({ name, username, password, role }) => {
    try {
        const newUser = new User({
            name,
            username,
            email,
            password,
            role,
        });

        const result = await newUser.save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding user: ${error.message}`);
    }
};

module.exports = AddUser;
