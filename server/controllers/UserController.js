const { handleApiResponse } = require('../modules/responseHandler');
const { ViewUser, AddUser, SingleUser, DeleteUser, UpdateUser } = require('../services/UserService');
const { idSchema } = require('../validators/Schemas');

// To get All Users list
const getAllUsers = async (req, res) => {
    try {
        const Users = await ViewUser(req.query);

        if (!Users || Users.length === 0) {
            return handleApiResponse(res, 404, 'Users Not found');
        }

        const formattedUsers = Users.map((user) => ({
            UserId: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role,
        }));

        handleApiResponse(res, 200, 'Users fetched successfully', {
            Users: formattedUsers,
            nbHits: Users.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching users', { error: error.message });
    }
};

// To get Single User Details
const getSingleUser = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const User = await SingleUser(id);

        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }
        const formattedUser = {
            UserId: User._id,
            username: User.username,
            email: User.email,
            password: User.password,
            role: User.role,
        };

        handleApiResponse(res, 200, 'User details fetched successfully', {
            User: formattedUser,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the single Client: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

// To Add a User to Users list
const postSingleUser = async (req, res) => {
    const data = req.body;
    try {
        const User = await AddUser(data);

        const formattedUser = {
            UserId: User._id,
            username: User.username,
            email: User.email,
            password: User.password,
            role: User.role,
        };
        handleApiResponse(res, 201, 'User added successfully', {
            CreatedUser: formattedUser,
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
const deleteSingleUser = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const DeletedUser = await SingleUser(id);

        if (!DeletedUser) {
            return handleApiResponse(res, 404, 'User not found, deletion unsuccessful');
        }
        const formattedDeletedUser = {
            username: DeletedUser.username,
            email: DeletedUser.email,
            role: DeletedUser.role,
        };

        const DeletedUserStatus = await DeleteUser(id);

        handleApiResponse(res, 200, 'User deleted successfully', {
            details: DeletedUserStatus,
            deletedUser: formattedDeletedUser,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while deleting the single Client: ${error.message}`;
        console.log(errorMessage);
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'Internal Server Error' });
    }
};

// To Update a Single User Details
const updateSingleUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        await idSchema.parseAsync({ _id: id });
        const updatedUser = await UpdateUser(id, updateUserData);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found, update unsuccessful' });
        }

        handleApiResponse(res, 200, 'User updated successfully', {
            updateduser: updatedUser,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single Client: ${error.message}`;
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
    getAllUsers,
    postSingleUser,
    getSingleUser,
    deleteSingleUser,
    updateSingleUser,
};
