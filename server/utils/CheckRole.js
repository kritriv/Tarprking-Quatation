const { user } = require('../constants');

function checkRole(role) {
    return user.Roles.includes(role);
}

module.exports = { checkRole };
