const {Quote } = require('../../models');
const path = require('path');
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
module.exports = 
    AddQuoteBackImg;
