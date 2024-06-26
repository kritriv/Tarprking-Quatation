const { Client, Quote2 } = require('../../models');
const { ObjectId } = require('mongodb');
const DeleteClient = async (id) => {
    try {
        await Quote2.deleteMany({ client: new ObjectId(id) });
        const filter = { _id: new ObjectId(id) };
        const result = await Client.findByIdAndDelete(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting Client: ${error.message}`);
    }
};
module.exports = DeleteClient;
