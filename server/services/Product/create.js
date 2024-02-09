const { User, ProductCategory, Product } = require('../../models');
const AddProduct = async ({ status, name, createdby, description, category, sub_products }) => {
    try {
        const existingUser = await User.findById(createdby);

        if (!existingUser) {
            throw new Error('User not found');
        }

        const existingCategory = await ProductCategory.findById(category);

        if (!existingCategory) {
            throw new Error('Category not found');
        }

        const newProduct = new Product({
            status,
            name,
            createdby,
            description,
            category,
            sub_products,
        });

        const result = await newProduct.save();

        existingCategory.products.push(result._id);
        await existingCategory.save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding product: ${error.message}`);
    }
};

module.exports = AddProduct;
