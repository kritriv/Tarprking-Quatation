const { User } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const ViewUser = async ({ id, name, username, role, email, sort, select, page = 1, size = 10 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }

        if (username) {
            queryObject.username = { $regex: new RegExp(username, 'i') };
        }

        if (name) {
            queryObject.name = { $regex: new RegExp(name, 'i') };
        }

        if (email) {
            queryObject.email = { $regex: new RegExp(email, 'i') };
        }
        if (role) {
            queryObject.role = role;
        }

        // ======== Short , Select ======

        let apiData = User.find(queryObject);

        if (sort) {
            let sortFix = sort.replace(',', ' ');
            apiData = apiData.sort(sortFix);
        }
        if (select) {
            let selectFix = select.split(',').join(' ');
            apiData = apiData.select(selectFix);
        }

        // ===== Pagination and limits ====

        // const { limit, offset } = limitOffsetPageNumber(page, size);
        // apiData = apiData.skip(offset).limit(limit);

        const Users = await apiData;
        return Users;
    } catch (error) {
        throw new Error('An error occurred while fetching Users: ' + error.message);
    }
};

module.exports = ViewUser;
