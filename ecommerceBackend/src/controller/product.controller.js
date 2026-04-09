import {
  createProductservice,
  getallProductServices,
  findProductService,
  updateProductService,
  deleteProductService,
} from "../service/product.service.js";

export const createProduct = async function (req, res) {
  try {
    let { productName, quantity, price } = req.body;

    productName = productName.trim();

    if (!productName && !price) {
      return res.status(400).json({
        message: "ProductName and Price are Required",
      });
    }

    if (!productName) {
      return res.status(400).json({
        message: "ProductName is Required",
      });
    }
    if (!price) {
      return res.status(400).json({
        message: "price is Required",
      });
    }
    const product = await createProductservice({
      productName,
      quantity,
      price,
    });
    return res.status(201).json({
      message: "Producted Created Successfully 🎉",
      product: {
        id: product.id,
        productName: product.productName,
        quantity: product.quantity,
        price: product.price,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error ${error}`,
    });
  }
};

// Get All Products
export const getAllProducts = async function (req, res) {
  try {
    const products = await getallProductServices();
    res.status(200).json({
      message: "Products listed Successfully :)",
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// Get Products By Id

export const getProductsById = async function (req, res) {
  try {
    const { id } = req.params;
    const product = await findProductService(id);

    if (!product) {
      return res.status(400).json({
        message: "😕 Product Not Found !",
      });
    }
    res.status(200).json({
      message: "Product listed Successully✅",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal server Error ${error}`,
    });
  }
};
// Update the Product

export const updateProduct = async function (req, res) {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        message: "No Products are here to Update 🥺",
      });
    }
    const product = await updateProductService(req.params.id, req.body);
    console.log("updated post", product);
    res.status(200).json({
      message: "Product Updated Successfully 😀",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error ${error}`,
    });
  }
};
export const deleteProduct = async function (req, res) {
  try {
    const id = req.params.id;
    const product = await deleteProductService(id);
    res.status(200).json({
      message: "Product deleted Successfully 💥",
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal Server error ${error}`,
    });
  }
};
