const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/User');

// To Add a User to Users list
const CreateItem = async (req, res) => {
    const data = req.body;
    try {
        const User = await create(data);

        const formattedUser = {
            id: User._id,
            name: User.name,
            username: User.username,
            email: User.email,
            password: User.password,
            role: User.role,
        };
        handleApiResponse(res, 201, 'User added successfully', {
            data: formattedUser,
        });
    } catch (error) {
        if (error.message.includes('E11000 duplicate key error')) {
            handleApiResponse(res, 400, 'User already exists. (email, Username must be unique)', { error: 'Duplicate key error' });
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Error creating and saving User.');
        }
    }
};

module.exports = CreateItem;
