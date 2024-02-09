const { Product, ProductCategory, SubProduct } = require('../../models');
const AddSubProduct = async ({ model_no, hsn, status, createdby, category, product, name, description, image, price, timings, specifications, tnc }) => {
    try {
        const existingCategory = await ProductCategory.findById(category);

        if (!existingCategory) {
            throw new Error('Category not found');
        }

        const existingProduct = await Product.findById(product);

        if (!existingProduct) {
            throw new Error('Product not found');
        }

        const newSubProduct = new SubProduct({
            model_no,
            hsn,
            status,
            createdby,
            category,
            product,
            name,
            description,
            image,
            price,
            timings,
            specifications,
            tnc,
        });

        const result = await SubProduct(newSubProduct).save();
        existingProduct.sub_products.push(result._id);
        await existingProduct.save();

        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding SubProduct: ${error.message}`);
    }
};

module.exports = AddSubProduct;
