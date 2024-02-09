const { Company } = require('../../models');
const { ObjectId } = require('mongodb');
const UpdateOurCompany = async (id, updateOurCompanyData) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Company.findByIdAndUpdate(filter, updateOurCompanyData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating OurCompany: ${error.message}`);
    }
};

module.exports = UpdateOurCompany;
