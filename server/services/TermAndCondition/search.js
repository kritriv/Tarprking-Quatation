const { TermAndCondition } = require('../../models');
const { ObjectId } = require('mongodb');

const SingleTermAndCondition = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await TermAndCondition.findOne(filter);

        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single TermAndConditions: ${error.message}`);
    }
};

module.exports = SingleTermAndCondition;
