import express from "express";
import cors from "cors";
import adminRouter from "../ecommerceBackend/src/router/admin.routes.js";
import userRouter from "../ecommerceBackend/src/router/user.routes.js";
import productRouter from "../ecommerceBackend/src/router/product.routes.js";
import cartRouter from "../ecommerceBackend/src/router/cart.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// API Routes declartion
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

export default app;
