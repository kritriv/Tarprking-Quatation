const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/User');

// To get All Users list
const ListAll = async (req, res) => {
    try {
        const users = await list(req.query);

        if (!users.length) {
            return handleApiResponse(res, 404, 'Users not found');
        }

        const formattedUsers = users.map(({ _id, name, username, email, role, password }) => ({
            id: _id,
            name,
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

module.exports = ListAll;
