const { SubProduct, Specification } = require('../../models');
const AddSpecification = async ({
    sub_product,
    system_module,
    system_area,
    car_size,
    lifting_capacity,
    lifting_height,
    platform,
    power,
    driving_unit,
    travelling_speed,
    material_delivery,
    installation,
    safety,
    features,
    amc,
    material_quality,
}) => {
    try {
        const existingSubProduct = await SubProduct.findById(sub_product);

        if (!existingSubProduct) {
            throw new Error('Sub Product not found');
        }
        const newSpecification = new Specification({
            sub_product,
            system_module,
            system_area,
            car_size,
            lifting_capacity,
            lifting_height,
            platform,
            power,
            driving_unit,
            travelling_speed,
            material_delivery,
            installation,
            safety,
            features,
            amc,
            material_quality,
        });

        const result = await Specification(newSpecification).save();
        existingSubProduct.specifications = result._id;
        await existingSubProduct.save();

        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding Specification: ${error.message}`);
    }
};

module.exports = AddSpecification;
