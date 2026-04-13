import { Cart } from "../model/cart.model.js";
import { Product } from "../model/products.model.js";

export const addProductsCart = async function (
  userId,
  productId,
  quantity = 1,
) {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Product is Not found 😕");
    }
    const alreadyProductExist = await Cart.findOne({
      where: { userId, productId },
    });

    const newQuantity = alreadyProductExist
      ? alreadyProductExist.quantity + quantity
      : quantity;

    if (newQuantity > product.quantity) {
      throw new Error(`Only ${product.quantity} items available in stock 😕`);
    }

    if (alreadyProductExist) {
      alreadyProductExist.quantity += quantity;
      await alreadyProductExist.save();
      return {
        message: "Product Quantity is Updated ✅",
        data: alreadyProductExist,
      };
    }

    const createItem = await Cart.create({
      userId,
      productId,
      quantity,
    });
    return {
      message: "Product is Add To the Cart Successfully 🎉",
      data: createItem,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCartItem = async function () {
  try {
    const cartItems = await Cart.findAll();
    if (cartItems.length === 0) {
      return {
        message: "NO Cart Items found 😕",
      };
    }

    return {
      message: "Cart Items are fetched Successfully 🎉",
      data: cartItems,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProductCart = async function (userId, productId) {
  try {
    const cartItem = await Cart.findOne({ where: { userId, productId } });

    if (!cartItem) {
      return {
        message: "Product is not found in cart 😕",
      };
    }
    await cartItem.destroy();
    return {
      message: "Product is Removed Successfully😀",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
