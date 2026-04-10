import { Router } from "express";
import { checkOutController } from "../controller/checkout.controller.js";
import { reqAuth } from "../middleware/reqAuth.middleware.js";

const router = Router();

router.route("/checkout").post(reqAuth, checkOutController);

export default router;
