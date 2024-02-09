const { Client } = require('../../models');
const AddClient = async (data) => {
    try {
        const result = await Client(data).save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding Client: ${error.message}`);
    }
};

module.exports = AddClient;
