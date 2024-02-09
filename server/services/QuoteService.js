const { User, Client, SubProduct, Quote } = require('../models');

const { ObjectId } = require('mongodb');
const path = require('path');
const { limitOffsetPageNumber } = require('../utils/pagination');

const ViewQuote = async ({ id, sort, select, page = 1, size = 10 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }

        let apiData = Quote.find(queryObject);

        // ======== Short , Select ======

        if (sort) {
            let sortFix = sort.replace(',', ' ');
            apiData = apiData.sort(sortFix);
        }
        if (select) {
            let selectFix = select.split(',').join(' ');
            apiData = apiData.select(selectFix);
        }

        // ===== Pagination and limits ====

        const { limit, offset } = limitOffsetPageNumber(page, size);
        apiData = apiData.skip(offset).limit(limit);

        const Quotes = await apiData;

        return Quotes;
    } catch (error) {
        throw new Error('An error occurred while fetching quotes: ' + error.message);
    }
};

const SingleQuote = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Quote.findOne(filter);

        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single quote: ${error.message}`);
    }
};

const AddQuote = async ({ refno, createdby, client, item, expired_date, subject, greeting, proposal_title, quote_price, back_image }) => {
    try {
        const userExist = await User.findById(createdby);
        if (!userExist) {
            throw new Error('User not found');
        }

        const clientExist = await Client.findById(client);
        if (!clientExist) {
            throw new Error('Client not found');
        }

        const productExist = await SubProduct.findById(item);
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

        const newQuote = new Quote({
            refno,
            createdby,
            client,
            item,
            expired_date,
            subject,
            greeting,
            proposal_title,
            quote_price: {
                quantity,
                item_sub_total,
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

const DeleteQuote = async (id) => {
    try {
        const result = await Quote.findByIdAndDelete(id);

        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting quote: ${error.message}`);
    }
};

const UpdateQuote = async (id, { refno, createdby, client, item, expired_date, subject, greeting, proposal_title, quote_price, back_image }) => {
    try {
        const filter = { _id: id };

        const quoteExist = await Quote.findById(id);
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

        const result = await Quote.findByIdAndUpdate(filter, updateQuoteData, {
            new: true,
            // runValidators: true,
        });

        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating quote: ${error.message}`);
    }
};

const AddQuoteBackImg = async (id, file) => {
    try {
        const quote = await Quote.findById(id);

        if (!quote) {
            throw new Error('Quote not found');
        }

        const imagePath = path.join(file.path);
        quote.back_image = imagePath;
        await quote.save();
        return `${imagePath}`;
    } catch (error) {
        throw new Error(`Error occurred while adding Back Img to Quote: ${error.message}`);
    }
};
module.exports = {
    ViewQuote,
    AddQuote,
    SingleQuote,
    DeleteQuote,
    UpdateQuote,
    AddQuoteBackImg,
};
