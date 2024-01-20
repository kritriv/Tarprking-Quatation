const roles = {
    ADMIN: ['ADMIN', 'SUPERADMIN'],
    USER: ['USER', 'ADMIN', 'SUPERADMIN'],
    SUPERADMIN: ['SUPERADMIN'],
  };
  
  const getPermissions = (role) => roles[role] || [];
  
  module.exports = { getPermissions };
  