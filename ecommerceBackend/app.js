import express from "express";
import cors from "cors";
import adminRouter from "../ecommerceBackend/src/router/admin.routes.js";
import userRouter from "../ecommerceBackend/src/router/user.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// API Routes declartion
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

export default app;
