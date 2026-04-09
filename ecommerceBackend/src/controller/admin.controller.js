import { createAdmin, findAdmin } from "../service/admin.service.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// common JWT Token Create Function
const maxage = 1 * 24 * 60 * 60;
const createJwtToken = (id) => {
  return jwt.sign({ id }, "backendecommerce", {
    expiresIn: maxage,
  });
};

export const RegisterAdmin = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();
    password = password.trim();

    if (!email && !password) {
      return res.status(400).json({
        message: "Email and Password are Required",
      });
    }

    if (!email) {
      return res.status(400).json({
        message: "Email is Required",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Password is Required",
      });
    }
    if (password.length < 6 || password.length > 10) {
      return res.status(400).json({
        message: "Password should be between 6 and 10 char ",
      });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        message: "Invalid Email address",
      });
    }

    const existingAdmin = await findAdmin(email);
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin Already Exist",
      });
    }

    const admin = await createAdmin({ email, password });
    //  calling the jwtToken function
    const jwtToken = createJwtToken(admin.id);
    res.cookie("adminjwtToken", jwtToken);
    return res.status(201).json({
      message: "🎉 Admin Created Successfully",
      admin: {
        id: admin.id,
        email: admin.email,
        password: admin.password,
      },
    });
  } catch (error) {
    console.log(">>>>Error", error);
    return res.status(500).json({
      message: `Internal Server Error, ${error}`,
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();
    password = password.trim();

    if (!email && !password) {
      return res.status(400).json({
        message: "Email and Password are Required",
      });
    }

    if (!email) {
      return res.status(400).json({
        message: "Email is Required",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Password is Required",
      });
    }
    if (password.length < 6 || password.length > 10) {
      return res.status(400).json({
        message: "Password should be between 6 and 10 char ",
      });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        message: "Invalid Email address",
      });
    }

    const admin = await findAdmin(email);
    if (!admin) {
      return res.status(400).json({
        message: "😕 Admin Not Found!",
      });
    }
    const auth = await bcrypt.compare(password, admin.password);
    if (!auth) {
      return res.status(400).json({
        message: "Password InCorrect ❌",
      });
    }
    const jwtToken = createJwtToken(admin.id);
    res.cookie("adminjwtToken", jwtToken);
    return res.status(201).json({
      message: "✅ Loggied in Successfully",
      admin: {
        id: admin.id,
        email: admin.email,
        password: admin.password,
      },
    });
  } catch (error) {
    (console.log("error", error),
      res.status(500).json({
        message: "Internal server error",
      }));
  }
};

export const adminLogout = (req, res) => {
  try {
    res.clearCookie("adminjwtToken");
    res.status(202).json({
      message: "You are successfully logged Out 🎉",
    });
  } catch (error) {
    res.status(401).json({
      message: `Internal server error  ${error}`,
    });
  }
};
