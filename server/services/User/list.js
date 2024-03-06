const { User } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const ViewUser = async ({ id, name, username, role, email, sort, select, page, size }) => {
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
        let ObjCount = await User.countDocuments(queryObject);

        if (sort) {
            let sortFix = sort.replace(',', ' ');
            apiData = apiData.sort(sortFix);
        } else {
            apiData = apiData.sort({ createdAt: -1 });
        }
        if (select) {
            let selectFix = select.split(',').join(' ');
            apiData = apiData.select(selectFix);
        }

        // ===== Pagination and limits ====

        const { limit, offset } = limitOffsetPageNumber(page, size);
        apiData = apiData.skip(offset).limit(limit);

        const Users = await apiData;
        return { Users, total: ObjCount };
    } catch (error) {
        throw new Error('An error occurred while fetching Users: ' + error.message);
    }
};

module.exports = ViewUser;
