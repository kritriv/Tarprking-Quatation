const Product = require('../models/ProductModel');
const SubProduct = require('../models/SubProductModel');
const Specification = require('../models/SpecificationModel');
const { ObjectId } = require('mongodb');
const { limitOffsetPageNumber } = require('../utils/pagination');

const ViewSpecification = async ({ id, sort, select, page = 1, size = 10 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }

        // ======== Short , Select ======

        let apiData = Specification.find(queryObject);

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

        const Specifications = await apiData.populate('sub_product').exec();

        return Specifications;
    } catch (error) {
        throw new Error('An error occurred while fetching Specifications: ' + error.message);
    }
};

const SingleSpecification = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Specification.findOne(filter).populate('sub_product').exec();

        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single Specification: ${error.message}`);
    }
};

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

const DeleteSpecification = async (id) => {
    try {
        const specification = await Specification.findById(id);
        const subProductId = specification.sub_product._id;

        const deletedSpecification = await Specification.findByIdAndDelete(id);

        // Remove the product from the associated category
        const subProduct = await SubProduct.findById(subProductId);
        if (subProduct) {
            subProduct.specifications.pull(id);
            subProduct.specifications = null;
            await subProduct.save();
        }

        return deletedSpecification;
    } catch (error) {
        throw new Error(`Error occurred while deleting Specification: ${error.message}`);
    }
};

const UpdateSpecification = async (id, updateSpecificationData) => {
    try {
        const filter = { _id: id };
        const result = await Specification.findByIdAndUpdate(filter, updateSpecificationData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating Specification: ${error.message}`);
    }
};

module.exports = {
    ViewSpecification,
    AddSpecification,
    SingleSpecification,
    DeleteSpecification,
    UpdateSpecification,
};
