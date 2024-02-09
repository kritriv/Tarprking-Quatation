const { SubProduct, TermAndCondition } = require('../models');

const { ObjectId } = require('mongodb');
const { limitOffsetPageNumber } = require('../utils/pagination');

const ViewTermAndConditions = async ({ id, sort, select, page = 1, size = 10 }) => {
    try {
        const queryObject = {};

        // ======= Filters Queries =======

        if (id) {
            queryObject._id = id;
        }

        // ======== Short , Select ======

        let apiData = TermAndCondition.find(queryObject);

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

        const TermAndConditions = await apiData;

        return TermAndConditions;
    } catch (error) {
        throw new Error('An error occurred while fetching TermAndConditionss: ' + error.message);
    }
};

const SingleTermAndCondition = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await TermAndCondition.findOne(filter);

        return result;
    } catch (error) {
        throw new Error(`Error occurred while retrieving single TermAndConditions: ${error.message}`);
    }
};

const AddTermAndCondition = async ({
    sub_product,
    prices,
    payment_terms,
    packing_forwarding,
    client_responsibilities,
    material_delivery,
    installation_process,
    operation,
    force_majeure,
    warranty,
    termination,
    jurisdiction,
    validity,
}) => {
    try {
        const existingSubProduct = await SubProduct.findById(sub_product);

        if (!existingSubProduct) {
            throw new Error('Sub Product not found');
        }

        const newTermAndConditions = new TermAndCondition({
            sub_product,
            prices,
            payment_terms,
            packing_forwarding,
            client_responsibilities,
            material_delivery,
            installation_process,
            operation,
            force_majeure,
            warranty,
            termination,
            jurisdiction,
            validity,
        });

        const result = await TermAndCondition(newTermAndConditions).save();
        existingSubProduct.tnc = result._id;
        await existingSubProduct.save();
        return result;
    } catch (error) {
        throw new Error(`Error occurred while adding TermAndConditions: ${error.message}`);
    }
};

const DeleteTermAndCondition = async (id) => {
    try {
        const termCondition = await TermAndCondition.findById(id);
        const subProductId = termCondition.sub_product._id;

        const deletedtermCondition = await TermAndCondition.findByIdAndDelete(id);

        // Remove the tnc from the Sub product
        const subProduct = await SubProduct.findById(subProductId);
        if (subProduct) {
            subProduct.tnc = null;
            await subProduct.save();
        }

        return deletedtermCondition;
    } catch (error) {
        throw new Error(`Error occurred while deleting TermAndConditions: ${error.message}`);
    }
};

const UpdateTermAndCondition = async (id, updateTermAndConditionsData) => {
    try {
        const filter = { _id: id };
        const result = await TermAndCondition.findByIdAndUpdate(filter, updateTermAndConditionsData, {
            new: true,
        });
        return result;
    } catch (error) {
        throw new Error(`Error occurred while updating TermAndConditions: ${error.message}`);
    }
};

module.exports = {
    ViewTermAndConditions,
    AddTermAndCondition,
    SingleTermAndCondition,
    DeleteTermAndCondition,
    UpdateTermAndCondition,
};
