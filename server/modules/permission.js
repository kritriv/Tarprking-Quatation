const roles = {
    MEDIUM: ['ADMIN', 'SUPERADMIN'],
    LOW: ['USER', 'ADMIN', 'SUPERADMIN'],
    HIGH: ['SUPERADMIN'],
};

const hasPermissions = (role) => roles[role] || [];

module.exports = { hasPermissions };
