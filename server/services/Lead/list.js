const { Lead } = require('../../models');
const { limitOffsetPageNumber } = require('../../utils/pagination');

const ViewLead = async ({ id, createdby, removed, name, email, phone, sort, select, page , size }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }
        if (removed !== undefined) {
            queryObject.removed = removed.toLowerCase() === 'true';
        }
        if (createdby) {
            queryObject.createdby = createdby;
        }
        if (name) {
            queryObject.name = { $regex: new RegExp(name, 'i') };
        }
        if (email) {
            queryObject.email = { $regex: new RegExp(email, 'i') };
        }
        if (phone) {
            queryObject.contact_no = { $regex: new RegExp(phone, 'i') };
        }
        

        let apiData = Lead.find(queryObject);
        let ObjCount = await Lead.countDocuments(queryObject);

        // ======== Short , Select ======

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

        const Leads = await apiData;
        return { Leads, total: ObjCount };
    } catch (error) {
        throw new Error('An error occurred while fetching Leads: ' + error.message);
    }
};

module.exports = ViewLead;
