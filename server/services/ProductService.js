const Product = require("../models/ProductModel");
const { ObjectId } = require("mongodb");

const ViewProduct = async (queryObject) => {
  let result = await Product.find(queryObject);
  return result;
};
const AddProduct = async (data) => {
  const result = await Product(data).save();
  return result;
};

const SingleProduct = async (id) => {
  const filter = { _id: new ObjectId(id) };
  const result = await Product.findOne(filter);
  return result;
};

const DeleteProduct = async (id) => {
  const filter = { _id: new ObjectId(id) };
  const result = await Product.deleteOne(filter);
  return result;
};

const UpdateProduct = async (id, updateProductData) => {
  const filter = { _id: id };
  const result = await Product.findByIdAndUpdate(filter, updateProductData, {
    new: true,
  });
  return result;
};

module.exports = {
  ViewProduct,
  AddProduct,
  SingleProduct,
  DeleteProduct,
  UpdateProduct,
};
