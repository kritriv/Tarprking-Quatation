const { handleApiResponse } = require('../../modules/responseHandler');
const { update } = require('../../services/Specification');
const { idSchema } = require('../../validators/Schemas');

// To Update a Single Specification Details
const UpdateItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });

        const updateSpecificationData = req.body;
        const Specification = await update(id, updateSpecificationData);

        if (!Specification) {
            return handleApiResponse(res, 404, 'Specification not found, update unsuccessful');
        }
        const formattedSpecification = {
            id: Specification._id,
            sub_product: Specification.sub_product ? Specification.sub_product.name : null,
            system_module: Specification.system_module,
            system_area: Specification.system_area,
            car_size: Specification.car_size,
            lifting_capacity: Specification.lifting_capacity,
            lifting_height: Specification.lifting_height,
            platform: Specification.platform,
            power: Specification.power,
            driving_unit: Specification.driving_unit,
            travelling_speed: Specification.travelling_speed,
            material_delivery: Specification.material_delivery,
            installation: Specification.installation,
            safety: Specification.safety,
            features: Specification.features,
            amc: Specification.amc,
            material_quality: Specification.material_quality,
        };
        handleApiResponse(res, 200, 'Specification updated successfully', {
            data: formattedSpecification,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Provide valid Id' : `An error occurred while updating the single Specification: ${error.message}`;
        if (errorMessage === 'Provide valid Id') {
            handleApiResponse(res, 400, errorMessage, { error: 'Internal Server Error' });
        } else {
            if (error.message.includes('E11000 duplicate key error')) {
                handleApiResponse(res, 500, 'Specification must be unique', { error: error.message });
            } else {
                handleApiResponse(res, 500, errorMessage, { error: 'Internal Server Error' });
            }
        }
    }
};

module.exports = UpdateItem;
