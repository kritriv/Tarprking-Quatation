const { handleApiResponse } = require('../../modules/responseHandler');
const { search } = require('../../services/Specification');
const { idSchema } = require('../../validators/Schemas');

// To get Single Specification Details
const ReadItem = async (req, res) => {
    try {
        const id = req.params.id;
        await idSchema.parseAsync({ _id: id });
        const Specification = await search(id);

        if (!Specification) {
            return handleApiResponse(res, 404, `Specification not found with id: ${id}`);
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

        handleApiResponse(res, 200, 'Specification details fetched successfully', {
            data: formattedSpecification,
            nbHits: 1,
        });
    } catch (error) {
        const errorMessage = error.message.includes('Invalid ID format') ? 'Use a Proper Id' : `An error occurred while fetching the Specification: ${error.message}`;
        handleApiResponse(res, error.message.includes('Invalid ID format') ? 400 : 500, errorMessage, { error: 'An error occurred while fetching the Specification' });
    }
};

module.exports = ReadItem;
