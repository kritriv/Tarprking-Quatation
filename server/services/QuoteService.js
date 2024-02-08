const User = require('../models/UserModel');
const Client = require('../models/ClientModel');
const Product = require('../models/SubProductModel');
const Quote = require('../models/QuoteModel');
const { ObjectId } = require('mongodb');
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

        const productExist = await Product.findById(item);
        if (!productExist) {
            throw new Error('Product not found');
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

const UpdateQuote = async (id, updateQuoteData) => {
    try {
        const filter = { _id: id };
        const result = await Quote.findByIdAndUpdate(filter, updateQuoteData, {
            new: true,
            runValidators: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating quote: ${error.message}`);
    }
};

module.exports = {
    ViewQuote,
    AddQuote,
    SingleQuote,
    DeleteQuote,
    UpdateQuote,
};
