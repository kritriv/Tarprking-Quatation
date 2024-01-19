const Quote = require('../models/QuoteModel');
const { ViewQuote, AddQuote, SingleQuote, DeleteQuote, UpdateQuote } = require('../services/QuoteService');

const { calculate } = require('../helpers/helpers');

const getAllQuotes = async (req, res) => {
    try {
        const { sort, select, page, limit } = req.query;

        const Quotes = await ViewQuote({
            sort,
            select,
            page: Number(page) || 1,
            limit: Number(limit) || 10,
        });

        if (!Quotes || Quotes.length === 0) {
            return res.status(404).json({
                Status: 'success',
                Message: 'Quotes Not found',
                Quotes: [],
                nbHits: 0,
            });
        }

        res.status(200).json({
            Status: 'success',
            Message: 'Quotes fetched successfully',
            Quotes,
            nbHits: Quotes.length,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching Quotes',
            error: error.message,
        });
    }
};

const createQuote = async (req, res) => {
    const data = req.body;
    try {
        const savedQuote = await AddQuote(data);
        res.status(201).json({
            status: 'success',
            message: 'Quote added successfully',
            savedQuote,
        });
    } catch (error) {
        if (error.message.includes('Quote with this Quote No. already exists')){
            res.status(400).json({
                status: 'fail',
                error: `${error.message}`,
                message: 'Quote with this Quote No. already exists',
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: `An error occurred while adding the Quote: ${error.message}`,
            });
        }
    }
};

// To get Single Quote Details
const getSingleQuote = async (req, res) => {
    try {
        const id = req.params.id;
        const Quote = await SingleQuote(id);

        if (!Quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Quote details fetched successfully',
            Quote: Quote,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while fetching the single Quote',
            error: error.message,
        });
    }
};

// To Delete a Single Quote Details
const deleteSingleQuote = async (req, res) => {
    try {
        const id = req.params.id;
        const Quote = await DeleteQuote(id);

        if (!Quote || Quote.deletedCount === 0) {
            return res.status(404).json({ message: 'Quote not found, deletion unsuccessful' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Quote deleted successfully',
            deletedQuote: Quote,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while deleting the single Quote',
            error: error.message,
        });
    }
};

// To Update a Single Quote Details
const updateSingleQuote = async (req, res) => {
    try {
        const id = req.params.id;
        const updateQuoteData = req.body;

        const updatedQuote = await UpdateQuote(id, updateQuoteData);

        if (!updatedQuote) {
            return res.status(404).json({ message: 'Quote not found, update unsuccessful' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Quote updated successfully',
            updatedQuote,
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while updating the single Quote',
            error: error.message,
        });
    }
};
module.exports = { getAllQuotes, createQuote, getSingleQuote, deleteSingleQuote, updateSingleQuote };
