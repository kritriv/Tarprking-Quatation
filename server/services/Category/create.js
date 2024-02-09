const { User, ProductCategory } = require('../../models');
const AddProductCategory = async ({ status, createdby, name, description }) => {
    try {
        const existingUser = await User.findById(createdby);

        if (!existingUser) {
            throw new Error('User not found');
        }

        const newProductCategory = new ProductCategory({
            status,
            createdby,
            name,
            description,
        });

        const result = await ProductCategory(newProductCategory).save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding ProductCategory: ${error.message}`);
    }
};

module.exports = AddProductCategory;
