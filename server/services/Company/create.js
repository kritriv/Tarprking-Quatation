const { Company } = require('../../models');

const AddOurCompany = async ({ name, emails, websites, phones, cin_no, tan_no, pan_no, gst_no, address, bank_details }) => {
    try {
        const newOurCompany = new Company({
            name,
            emails,
            websites,
            phones,
            cin_no,
            tan_no,
            pan_no,
            gst_no,
            address,
            bank_details,
        });

        const result = await Company(newOurCompany).save();

        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding OurCompany: ${error.message}`);
    }
};

module.exports = AddOurCompany;
