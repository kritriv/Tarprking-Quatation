const Vendor = require('../models/ProductModel'); 

// Function to check if a username is unique
const isUsernameUnique = async (username) => {
  try {
    // Check if any vendor already has the provided username
    const existingVendor = await Vendor.findOne({ vendor_username: username });
    
    // If existingVendor is null, username is unique; otherwise, it already exists
    return existingVendor === null;
  } catch (error) {
    // Handle the error, log it, and return false assuming uniqueness check failed due to error
    console.error('Error checking username uniqueness:', error);
    return false;
  }
};

module.exports = { isUsernameUnique };
