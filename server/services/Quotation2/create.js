const { User, Client, Company, SubProduct, Quote2 } = require('../../models');
const AddQuote = async ({ refno, createdby, client, ourCompany, item, tnc, expired_date, subject, greeting, proposal_title, quote_price, back_image }) => {
    try {
        const userExist = await User.findById(createdby);
        if (!userExist) {
            throw new Error('User not found');
        }

        const clientExist = await Client.findById(client);
        if (!clientExist) {
            throw new Error('Client not found');
        }

        const ourCompanyExist = await Company.findById(ourCompany);
        if (!ourCompanyExist) {
            throw new Error('Company not found');
        }

        const productExist = item && (await SubProduct.findById(item.id));

        if (!productExist) {
            throw new Error(' SubProduct not found');
        }
        itemStr = JSON.stringify(item);
        item = itemStr;

        tncStr = JSON.stringify(tnc);
        tnc = tncStr;

        const basic_rate = quote_price.basic_rate || 0;
        const installation_charges = quote_price.installation_charges || 0;
        const tax_rate = quote_price.tax_rate || 18;
        const quantity = quote_price.quantity || 1;
        const item_sub_total = (basic_rate + installation_charges) * quantity;

        const taxtotal = ((item_sub_total * tax_rate) / 100);
        const discount = quote_price.discount || 0;
        const freight_cost = quote_price.freight_cost || 0;
        const unloading_cost = quote_price.unloading_cost || 0;
        const transport_charge = quote_price.transport_charge || 0;

        const total_price = item_sub_total + taxtotal + freight_cost + unloading_cost + transport_charge - discount;

        const newQuote = new Quote2({
            refno,
            createdby,
            client,
            ourCompany,
            item,
            tnc,
            expired_date,
            subject,
            greeting,
            proposal_title,
            quote_price: {
                quantity,
                basic_rate,
                installation_charges,
                freight_cost,
                unloading_cost,
                transport_charge,
                tax_rate,
                taxtotal,
                discount,
                total_price,
            },
            back_image,
        });
        const result = await newQuote.save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding quote: ${error.message}`);
    }
};

module.exports = AddQuote;
