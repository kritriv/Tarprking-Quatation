const { Lead } = require('../../models');
const AddLead = async (data) => {
    try {
        const result = await Lead(data).save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding Lead: ${error.message}`);
    }
};

module.exports = AddLead;
