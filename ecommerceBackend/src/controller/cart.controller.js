import {
  addProductsCart,
  deleteProductCart,
  getCartById,
  getCartItem,
} from "../service/cart.service.js";

export const addToCart = async function (req, res) {
  try {
    let { productId, quantity } = req.body;
    let { user } = req;

    if (!user || !productId) {
      return res.status(400).json({
        message: "userId and ProductId is Required",
      });
    }

    if (!user) {
      res.status(400).json({
        message: "userId is Required",
      });
    }
    if (!productId) {
      res.status(400).json({
        message: "Product Id is Required",
      });
    }
    if (quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be Greaterthan zero 0",
      });
    }
    const addedItem = await addProductsCart(user.id, productId, quantity);
    return res.status(200).json({
      message: addedItem.message,
      data: addedItem.data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getCartsById = async function (req, res) {
  try {
    const Item = await getCartById(req.params.id);
    return res.status(200).json({
      message: Item.message,
      data: Item.data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getCarts = async function (req, res) {
  try {
    const cartItems = await getCartItem(req.user.id);
    return res.status(200).json({
      message: cartItems.message,
      data: cartItems.data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const removeFromCart = async function (req, res) {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      return res.status(400).json({
        message: "UserId and ProductId are Required !",
      });
    }
    const deletedItem = await deleteProductCart(userId, productId);
    return res.status(200).json({
      message: deletedItem.message,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
