import { Router } from "express";
import { RegisterAdmin } from "../controller/admin.controller.js";

const router = Router();

router.post("/adminRegister", RegisterAdmin);

export default router;
