import { Cart } from "../model/cart.model.js";
import { Order } from "../model/order.model.js";
import { orderItem } from "../model/orderItem.model.js";
import { Product } from "../model/products.model.js";

export const checkoutService = async function (userId) {
  const cartItems = await Cart.findAll({
    where: { userId },
  });
  if (cartItems.length === 0) {
    throw new Error("Cart is Empty 📦");
  }
  let totalAmount = 0;
  const order = await Order.create({
    userId,
    totalAmount: 0,
    status: "pending",
  });

  for (const item of cartItems) {
    const product = await Product.findByPk(item.productId);
    if (!product) {
      throw new Error(`product not found 😕`);
    }

    if (product.quantity < item.quantity) {
      throw new Error(`Not enough stock for ${product.productName}`);
    }
    const itemTotal = product.price * item.quantity;
    totalAmount += itemTotal;
    await orderItem.create({
      orderId: order.id,
      productId: product.id,
      price: product.price,
      quantity: item.quantity,
    });
    product.quantity -= item.quantity;
    await product.save();
  }
  order.totalAmount = totalAmount;
  await order.save();
  await Cart.destroy({
    where: { userId },
  });
  return {
    orderId: order.id,
    totalAmount,
  };
};
