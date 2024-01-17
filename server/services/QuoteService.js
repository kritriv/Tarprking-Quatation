const Quote = require('../models/QuoteModel');
const { ObjectId } = require('mongodb');

const ViewQuote = async ({ sort, select, page = 1, limit = 10 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======


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

        const skip = (page - 1) * limit;
        apiData = apiData.skip(skip).limit(limit);

        const Quotes = await apiData;
        return Quotes;
    } catch (error) {
        throw new Error('An error occurred while fetching Quotes: ' + error.message);
    }
};

const AddQuote = async (data) => {
    try {
        const result = await Quote(data).save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding Quote: ${error.message}`);
    }
};

const SingleQuote = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Quote.findOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single Quote: ${error.message}`);
    }
};

const DeleteQuote = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Quote.deleteOne(filter);
        return result;
    } catch (error) {
        throw new Error(`Error occurred while deleting Quote: ${error.message}`);
    }
};

const UpdateQuote = async (id, updateQuoteData) => {
    try {
        const filter = { _id: id };
        const result = await Quote.findByIdAndUpdate(filter, updateQuoteData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating Quote: ${error.message}`);
    }
};

module.exports = {
    ViewQuote,
    AddQuote,
    SingleQuote,
    DeleteQuote,
    UpdateQuote,
};
