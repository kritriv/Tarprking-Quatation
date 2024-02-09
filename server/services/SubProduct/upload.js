const { SubProduct } = require('../../models');
const { ObjectId } = require('mongodb');
const path = require('path');
const AddSubProductImg = async (id, file) => {
    try {
        const filter = { _id: new ObjectId(id) };

        const subProduct = await SubProduct.findById(filter);

        if (!subProduct) {
            throw new Error('Sub product not found');
        }

        const imagePath = path.join(file.path);
        subProduct.image = imagePath;
        await subProduct.save();
        return `${imagePath}`;
    } catch (error) {
        throw new Error(`Error occurred while adding Img to SubProduct: ${error.message}`);
    }
};

module.exports = AddSubProductImg;
