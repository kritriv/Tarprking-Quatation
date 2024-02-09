const { Client } = require('../../models');
const { ObjectId } = require('mongodb');
const SingleClient = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Client.findOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single Client: ${error.message}`);
    }
};

module.exports = SingleClient;
