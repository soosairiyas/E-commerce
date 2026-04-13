import { checkoutService } from "../service/checkout.service.js";

export const checkOutController = async function (req, res) {
  try {
    const userId = req.user.id;

    const checkout = await checkoutService(userId);

    res.status(200).json({
      message: "Checkout Successfully 😀",
      data: checkout,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};
