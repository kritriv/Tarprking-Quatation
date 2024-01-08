const Vendor = require("../models/VendorModel");
const { ObjectId } = require("mongodb");

const ViewVendor =  (queryObject) => {
  let result =  Vendor.find(queryObject);
  return result;
};
const AddVendor = async (data) => {
  const result = await Vendor(data).save();
  return result;
};

const SingleVendor = async (id) => {
  const filter = { _id: new ObjectId(id) };
  const result = await Vendor.findOne(filter);
  return result;
};

const DeleteVendor = async (id) => {
  const filter = { _id: new ObjectId(id) };
  const result = await Vendor.deleteOne(filter);
  return result;
};

const UpdateVendor = async (id, updateVendorData) => {
  const filter = { _id: id };
  const result = await Vendor.findByIdAndUpdate(filter, updateVendorData, {
    new: true,
  });
  return result;
};

module.exports = {
  ViewVendor,
  AddVendor,
  SingleVendor,
  DeleteVendor,
  UpdateVendor,
};
