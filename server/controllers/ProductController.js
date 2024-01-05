const Product = require("../models/ProductModel");
const { ObjectId } = require('mongodb');

// To get All Products List
const getAllProducts = async (req, res) => {
    // try {
    const { product_id, product_HSN, product_status, admin_create_username, product_name, sub_type, sort, select } = req.query;
    const queryObject = {};

    // ======= Filters Queries =======

    if (product_id) {
        queryObject.product_id = product_id;
    }
    if (product_HSN) {
        queryObject.product_HSN = product_HSN;
    }
    if (product_status !== undefined) {
        queryObject.product_status = (product_status.toLowerCase() === 'true');
    }
    if (admin_create_username) {
        queryObject.admin_create_username = { $regex: new RegExp(admin_create_username, 'i') };
    }
    if (product_name) {
        queryObject.product_name = { $regex: new RegExp(product_name, 'i') };
    }
    if (sub_type) {
        queryObject.sub_type = { $regex: new RegExp(sub_type, 'i') };
    }


    let apiData = Product.find(queryObject);
    // apiData = apiData.sort({ updatedAt: -1 });
    // ======== Short , Select ======

    if (sort) {
        let sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix);
    }
    if (select) {
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    // ===== Pagination and limits ====

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 20;

    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);

    const Products = await apiData;
    res.status(200).json({ Products, nbHits: Products.length });


    // } catch (error) {
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
}

// To get Single Product Details
const getSingleProduct = async (req, res) =>{
    const id=req.params.id;
    const filter={_id:new ObjectId(id)};
    const result=await Product.findOne(filter);
    res.send(result);
}

// To Delete a Single Product Details
const deleteSingleProduct = async (req, res) =>{
    const id=req.params.id;
    const filter={_id:new ObjectId(id)};
    const result=await Product.deleteOne(filter);
    res.send(result);
}

// To Add a Product to Products list
const postSingleProduct = async (req, res) => {
    const data = req.body;
    try {
      const newProduct = new Product(data);
      const savedProduct = await newProduct.save();
      res.status(201).send(savedProduct); // HTTP status 201 for successful creation
    } catch (error) {
      console.error('Error creating and saving product:', error);
      res.status(500).send({ error: 'Error creating and saving product.' });
    }
  };

// To Update a Single Product Details
const updateSingleProduct = async (req, res) =>{
    const id=req.params.id;
    const updateProductData=req.body;
    const filter={_id:new ObjectId(id)};

    const updateDoc={
        $set:{
          ...updateProductData
        },
      }
      const options={upsert:true};

    const result=await Product.updateOne(filter,updateDoc,options);
  res.send(result);
}

module.exports = { getAllProducts, getSingleProduct, postSingleProduct, deleteSingleProduct, updateSingleProduct};