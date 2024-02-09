const { TermAndCondition } = require('../../models');
const { ObjectId } = require('mongodb');

const UpdateTermAndCondition = async (id, updateTermAndConditionsData) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await TermAndCondition.findByIdAndUpdate(filter, updateTermAndConditionsData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating TermAndConditions: ${error.message}`);
    }
};

module.exports = UpdateTermAndCondition;
