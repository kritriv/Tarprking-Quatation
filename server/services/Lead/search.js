const { Lead } = require('../../models');
const { ObjectId } = require('mongodb');
const SingleLead = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Lead.findOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single Lead: ${error.message}`);
    }
};

module.exports = SingleLead;
