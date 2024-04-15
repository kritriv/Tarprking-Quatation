const { Lead } = require('../../models');
const { ObjectId } = require('mongodb');
const UpdateLead = async (id, updateLeadData) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Lead.findByIdAndUpdate(filter, updateLeadData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating Lead: ${error.message}`);
    }
};

module.exports = UpdateLead;
