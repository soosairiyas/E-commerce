import { Router } from "express";
import {
  addToCart,
  removeFromCart,
  getCarts,
  getCartsById,
} from "../controller/cart.controller.js";
import { reqAuth } from "../middleware/reqAuth.middleware.js";

const router = Router();

router.route("/addcart").post(reqAuth, addToCart);
router.route("/removecart").delete(reqAuth, removeFromCart);
router.route("/getcart").get(reqAuth, getCarts);
router.route("/getcartById/:id").get(reqAuth, getCartsById);

export default router;
