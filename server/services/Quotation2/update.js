const { User, Client, SubProduct, Quote2 } = require('../../models');
const { ObjectId } = require('mongodb');

const UpdateQuote = async (id, { refno, createdby, client, item, expired_date, subject, greeting, proposal_title, quote_price, back_image }) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const quoteExist = await Quote2.findById(id);
        const userExist = await User.findById(createdby);
        const clientExist = await Client.findById(client);
        const productExist = await SubProduct.findById(item);

        if (!userExist) {
            throw new Error('Created by User not found');
        }
        if (!clientExist) {
            throw new Error('Client not found');
        }
        if (!productExist) {
            throw new Error(' SubProduct not found');
        }

        const item_sub_total = productExist.price.subTotal;
        const tax_rate = quote_price.tax_rate || 18;
        const quantity = quote_price.quantity || 1;

        const taxtotal = ((item_sub_total * tax_rate) / 100) * quantity;
        const discount = quote_price.discount || 0;
        const freight_cost = quote_price.freight_cost || 0;
        const unloading_cost = quote_price.unloading_cost || 0;
        const transport_charge = quote_price.transport_charge || 0;

        const total_price = item_sub_total * quantity + taxtotal + freight_cost + unloading_cost + transport_charge - discount;

        const updateQuoteData = {
            refno: refno || quoteExist.refno,
            createdby: createdby || quoteExist.createdby,
            client: client || quoteExist.client,
            item: item || quoteExist.item,
            expired_date: expired_date || quoteExist.expired_date,
            subject: subject || quoteExist.subject,
            greeting: greeting || quoteExist.greeting,
            proposal_title: proposal_title || quoteExist.proposal_title,
            quote_price: {
                quantity: quantity,
                item_sub_total: item_sub_total,
                freight_cost: freight_cost,
                unloading_cost: unloading_cost,
                transport_charge: transport_charge,
                tax_rate: tax_rate,
                taxtotal: taxtotal,
                discount: discount,
                total_price: total_price,
            },
            back_image: back_image || quoteExist.back_image,
        };

        const result = await Quote2.findByIdAndUpdate(filter, updateQuoteData, {
            new: true,
            // runValidators: true,
        });

        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating quote: ${error.message}`);
    }
};

module.exports = UpdateQuote;
