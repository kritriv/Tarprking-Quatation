const { handleApiResponse } = require('../modules/responseHandler');
const { create, list, search, remove, update } = require('../services/User');
const { idSchema } = require('../validators/Schemas');

// To get All Users list
const ListAll = async (req, res) => {
    try {
        const users = await list(req.query);

        if (!users.length) {
            return handleApiResponse(res, 404, 'Users not found');
        }

        const formattedUsers = users.map(({ _id, username, email, role, password }) => ({
            id: _id,
            username,
            email,
            password,
            role,
        }));

        handleApiResponse(res, 200, 'Users fetched successfully', {
            data: formattedUsers,
            nbHits: users.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'Error fetching users', { error: error.message });
    }
};

// To get Single User Details
const ReadItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const User = await search(id);

        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }
        const formattedUser = {
            id: User._id,
            username: User.username,
            email: User.email,
            password: User.password,
            role: User.role,
        };

        handleApiResponse(res, 200, 'User details fetched successfully', {
            data: formattedUser,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the single User: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

// To Add a User to Users list
const CreateItem = async (req, res) => {
    const data = req.body;
    try {
        const User = await create(data);

        const formattedUser = {
            id: User._id,
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

// To Delete a Single User Details
const RemoveItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const DeletedUser = await search(id);

        if (!DeletedUser) {
            return handleApiResponse(res, 404, 'User not found, deletion unsuccessful');
        }
        const formattedDeletedUser = {
            username: DeletedUser.username,
            email: DeletedUser.email,
            role: DeletedUser.role,
        };

        const DeletedUserStatus = await remove(id);

        handleApiResponse(res, 200, 'User deleted successfully', {
            details: DeletedUserStatus,
            deleted: formattedDeletedUser,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the single User: ${error.message}`;
        console.log(errorMessage);
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

// To Update a Single User Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        await idSchema.parseAsync({ _id: id });
        const updatedUser = await update(id, updateUserData);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found, update unsuccessful' });
        }

        handleApiResponse(res, 200, 'User updated successfully', {
            data: updatedUser,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single User: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: error.issues[0].message });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'Username & Email must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: error.message });
            }
        }
    }
};

module.exports = {
    ListAll,
    CreateItem,
    ReadItem,
    RemoveItem,
    UpdateItem,
};
