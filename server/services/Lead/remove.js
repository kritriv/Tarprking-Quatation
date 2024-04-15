const { Lead } = require('../../models');
const { ObjectId } = require('mongodb');
const DeleteLead = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Lead.findByIdAndDelete(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting Lead: ${error.message}`);
    }
};
module.exports = DeleteLead;
