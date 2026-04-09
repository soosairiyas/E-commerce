import { Product } from "../model/products.model.js";

export const createProductservice = async function (product) {
  return await Product.create({
    productName: product.productName,
    quantity: product.quantity,
    price: product.price,
  });
};

export const getallProductServices = async function () {
  return await Product.findAll();
};

export const findProductService = async function (id) {
  const product = await Product.findByPk(id);
  return product;
};

export const updateProductService = async function (id, newProduct) {
  await Product.update(newProduct, { where: { id } });

  const updatedProduct = await Product.findByPk(id);
  return updatedProduct;
};

export const deleteProductService = async function (id) {
  return await Product.destroy({ where: { id } });
};
