import {
  addProductsCart,
  deleteProductCart,
  getCartItem,
} from "../service/cart.service.js";

export const addToCart = async function (req, res) {
  try {
    let { userId, productId, quantity } = req.body;

    console.log("Body Data", req.body);
    if (!userId || !productId) {
      return res.status(400).json({
        message: "userId and ProductId is Required",
      });
    }

    if (!userId) {
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
    const addedItem = await addProductsCart(userId, productId, quantity);
    return res.status(200).json({
      message: addedItem.message,
      data: addedItem.data,
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error ${error}`,
    });
  }
};

export const getCarts = async function (req, res) {
  try {
    const cartItems = await getCartItem();
    return res.status(200).json({
      message: cartItems.message,
      data: cartItems.data,
    });
  } catch (error) {
    return res.status(500).json({
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
    res.status(500).json({
      message: `Internal Server Error ${error}`,
    });
  }
};
