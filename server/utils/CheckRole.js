const {Roles} = require('../constants/user');

 function checkRole(role){
    return Roles.includes(role);
}

module.exports = {checkRole}
