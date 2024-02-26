const { Company } = require('../../models');

const AddOurCompany = async ({ status, name, emails, websites, phones, cin_no, tan_no, pan_no, gst_no, address, bank_details }) => {
    try {
        const newOurCompany = new Company({
            status,
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
