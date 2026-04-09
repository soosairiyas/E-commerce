import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  getProductsById,
  deleteProduct,
} from "../controller/product.controller.js";

const router = Router();

router.route("/createproduct").post(createProduct);
router.route("/getproducts").get(getAllProducts);
router.route("/updateproduct/:id").patch(updateProduct);
router.route("/deleteproduct/:id").delete(deleteProduct);
router.route("/productbyid/:id").get(getProductsById);

export default router;
