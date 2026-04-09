import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  getProductsById,
  deleteProduct,
} from "../controller/product.controller.js";
import { reqAuth, adminOnly } from "../middleware/reqAuth.middleware.js";

const router = Router();

router.route("/createproduct").post(reqAuth, adminOnly, createProduct);
router.route("/getproducts").get(reqAuth, getAllProducts);
router.route("/updateproduct/:id").patch(reqAuth, adminOnly, updateProduct);
router.route("/deleteproduct/:id").delete(reqAuth, adminOnly, deleteProduct);
router.route("/productbyid/:id").get(reqAuth, getProductsById);

export default router;
