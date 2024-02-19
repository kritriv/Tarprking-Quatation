const { handleApiResponse } = require('../../modules/responseHandler');
const { list } = require('../../services/Specification');
// To get All Specifications list
const ListAll = async (req, res) => {
    try {
        const { Specifications, total } = await list(req.query);
        if (!Specifications || Specifications.length === 0) {
            return handleApiResponse(res, 404, 'Specification not found');
        }

        const formattedSpecification = Specifications.map((Specification) => ({
            id: Specification._id,
            sub_product: Specification.sub_product.name,
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
        }));

        handleApiResponse(res, 200, 'Specifications fetched successfully', {
            data: formattedSpecification,
            total: total,
            nbHits: Specifications.length,
        });
    } catch (error) {
        handleApiResponse(res, 500, 'An error occurred while fetching the Specifications', { error: error.message });
    }
};

module.exports = ListAll;
