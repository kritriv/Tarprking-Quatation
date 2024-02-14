const { Quote2 } = require('../../models');
const { ObjectId } = require('mongodb');

const DeleteQuote = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Quote2.findByIdAndDelete(filter);

        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting quote: ${error.message}`);
    }
};

module.exports = DeleteQuote;
