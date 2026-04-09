import { Router } from "express";
import {
  RegisterAdmin,
  adminLogin,
  adminLogout,
} from "../controller/admin.controller.js";

const router = Router();

router.post("/adminRegister", RegisterAdmin);
router.post("/adminLogin", adminLogin);
router.post("/adminLogout", adminLogout);

export default router;
