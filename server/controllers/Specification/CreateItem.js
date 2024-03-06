const { handleApiResponse } = require('../../modules/responseHandler');
const { create } = require('../../services/Specification');
// To Add a Specification to Specifications list
const CreateItem = async (req, res) => {
    try {
        const Specification = await create(req.body);

        // const formattedSpecification = {
        //     id: Specification._id,
        //     sub_product: Specification.sub_product ? Specification.sub_product.name : null,
        //     system_module: Specification.system_module,
        //     system_area: Specification.system_area,
        //     car_size: Specification.car_size,
        //     lifting_capacity: Specification.lifting_capacity,
        //     lifting_height: Specification.lifting_height,
        //     platform: Specification.platform,
        //     power: Specification.power,
        //     driving_unit: Specification.driving_unit,
        //     travelling_speed: Specification.travelling_speed,
        //     material_delivery: Specification.material_delivery,
        //     installation: Specification.installation,
        //     safety: Specification.safety,
        //     features: Specification.features,
        //     amc: Specification.amc,
        //     material_quality: Specification.material_quality,
        // };

        handleApiResponse(res, 201, 'Specification added successfully', {
            data: Specification,
        });
    } catch (error) {
        if (error.message.includes('Specification with this Sub Product Id already exists')) {
            handleApiResponse(res, 400, 'Specification with this Sub Product Id already exists');
        } else {
            handleApiResponse(res, error.status || 500, error.message || 'Internal server error');
        }
    }
};
module.exports = CreateItem;
