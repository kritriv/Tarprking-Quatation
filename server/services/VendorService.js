const Vendor = require("../models/VendorModel");
const { ObjectId } = require('mongodb');

const ViewVendor = async (queryObject) =>{
    let result= await Vendor.find(queryObject);
    return result;

}
const AddVendor = async (data) =>{
    const result=await Vendor(data).save();
    return result;
}

const SingleVendor = async (id) =>{
    const filter={_id:new ObjectId(id)};
    const result=await Vendor.findOne(filter);
    return result;
}

const DeleteVendor = async (id) =>{
    const filter={_id:new ObjectId(id)};
    const result=await Vendor.deleteOne(filter);
    return result;
}

module.exports = {ViewVendor, AddVendor, SingleVendor, DeleteVendor};