const { User } = require('../../models');
const { hashPassword } = require('../../modules/password');

const AddUser = async ({ name, username, email, password, role }) => {
    try {

        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
            role,
        });

        const result = await newUser.save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding user: ${error.message}`);
    }
};

module.exports = AddUser;
