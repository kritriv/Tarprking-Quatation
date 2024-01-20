const roles = {
    MEDIUM: ['ADMIN', 'SUPERADMIN'],
    LOW: ['USER', 'ADMIN', 'SUPERADMIN'],
    HIGH: ['SUPERADMIN'],
  };
  
  const getPermissions = (role) => roles[role] || [];
  
  module.exports = { getPermissions };
  