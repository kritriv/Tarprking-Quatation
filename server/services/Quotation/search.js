const { Quote } = require('../../models');
const { ObjectId } = require('mongodb');

const SingleQuote = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Quote.findOne(filter);

        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single quote: ${error.message}`);
    }
};

module.exports = SingleQuote;
