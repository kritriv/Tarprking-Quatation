const { Client } = require('../../models');
const { ObjectId } = require('mongodb');
const UpdateClient = async (id, updateClientData) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Client.findByIdAndUpdate(filter, updateClientData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating Client: ${error.message}`);
    }
};

module.exports = UpdateClient;
