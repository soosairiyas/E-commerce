import { updateProduct } from "../controller/product.controller.js";
import { Product } from "../model/products.model.js";

export const createProductservice = async function ({
  productName,
  quantity,
  price,
}) {
  if (!productName && !price) {
    throw new Error("ProductName and Price are Required");
  }

  if (!productName) {
    throw new Error("ProductName is Required");
  }

  if (!price) {
    throw new Error("Price is Required");
  }

  productName = productName.trim();

  const product = await Product.create({
    productName,
    quantity,
    price,
  });

  return {
    message: "Product Created Successfully 🎉",
    data: product,
  };
};

export const getallProductService = async function () {
  const products = await Product.findAll();
  if (products.length === 0) {
    throw new Error("No Products Available 🥺");
  }
  return {
    message: "Product list Fetched ",
    products,
  };
};

export const findProductService = async function (id) {
  const product = await Product.findByPk(id);

  if (!product) {
    throw new Error("😕 Product Not Found !");
  }

  return {
    message: "Product listed Successfully ✅",
    product,
  };
};
export const updateProductService = async function (id, newProduct) {
  await Product.update(newProduct, { where: { id } });
  const updatedProduct = Product.findByPk(id);
  if (!updatedProduct) {
    throw new Error("Product Not Updated 🙁");
  }
  return {
    message: "Product Updated Successfully 😀",
    updateProduct,
  };
};
export const deleteProductService = async function (id) {
  await Product.destroy({ where: { id } });

  return {
    message: "Product deleted Successfully 💥",
  };
};
