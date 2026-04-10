import { Router } from "express";
import {
  addToCart,
  removeFromCart,
  getCarts,
} from "../controller/cart.controller.js";
import { reqAuth } from "../middleware/reqAuth.middleware.js";

const router = Router();

router.route("/addcart").post(reqAuth, addToCart);
router.route("/removecart").delete(reqAuth, removeFromCart);
router.route("/getcart").get(reqAuth, getCarts);

export default router;
