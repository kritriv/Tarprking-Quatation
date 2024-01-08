
const {
  ViewProduct,
  AddProduct,
  SingleProduct,
  DeleteProduct,
  UpdateProduct,
} = require("../services/ProductService");

// To get All Products List
const getAllProducts = async (req, res) => {
  try {
    const {
      product_id,
      product_HSN,
      product_status,
      admin_create_username,
      product_name,
      sub_type,
      sort,
      select,
    } = req.query;

    const queryObject = {};

    // ======= Filters Queries =======

    if (product_id) {
      queryObject.product_id = product_id;
    }
    if (product_HSN) {
      queryObject.product_HSN = product_HSN;
    }
    if (product_status !== undefined) {
      queryObject.product_status = product_status.toLowerCase() === "true";
    }
    if (admin_create_username) {
      queryObject.admin_create_username = {
        $regex: new RegExp(admin_create_username, "i"),
      };
    }
    if (product_name) {
      queryObject.product_name = { $regex: new RegExp(product_name, "i") };
    }
    if (sub_type) {
      queryObject.sub_type = { $regex: new RegExp(sub_type, "i") };
    }

    let apiData =  ViewProduct(queryObject);

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
    let limit = Number(req.query.limit) || 5;

    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);

    const Products = await apiData;
    res.status(200).json({ status: 'success', message: 'Products fetched successfully', Products, nbHits: Products.length });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching products",
        error: error.message,
      });
  }
};
// To get Single Product Details
const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const Product = await SingleProduct(id);

    if (!Product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Product details fetched successfully",
      data: Product,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the single Product",
      error: error.message,
    });
  }
};

// To Delete a Single Product Details
const deleteSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const Product = await DeleteProduct(id);

    if (!Product) {
      return res
        .status(404)
        .json({ message: "Product not found, deletion unsuccessful" });
    }
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      deletedProduct: Product,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the single Product",
      error: error.message,
    });
  }
};

// To Add a Product to Products list
const postSingleProduct = async (req, res) => {
  const data = req.body;
  try {
    const savedProduct = await AddProduct(data);
    res.status(201).json({
      status: "success",
      message: "Product added successfully",
      savedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating and saving Product." });
  }
};

// To Update a Single Product Details
const updateSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updateProductData = req.body;

    const updatedProduct = await UpdateProduct(id, updateProductData);

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found, update unsuccessful" });
    }

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the single Product",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  postSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
};
