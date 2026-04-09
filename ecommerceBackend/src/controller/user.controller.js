import { createUser, findUserByEmail } from "../service/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// common JWT Token Create Function for User
const maxage = 1 * 24 * 60 * 60;
const createJwtToken = (id) => {
  return jwt.sign({ id }, "backendecommerceuser", {
    expiresIn: maxage,
  });
};

export const userRegistration = async function (req, res) {
  try {
    let { userName, password, email } = req.body;
    userName = userName.trim();
    email = email.trim().toLowerCase();
    password = password.trim();

    if (!userName && !password && !email) {
      return res.status(400).json({
        message: "All Fields are Required",
      });
    }
    if (!userName) {
      return res.status(400).json({
        message: "UserName is Required",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Password is Required",
      });
    }
    if (!email) {
      return res.status(400).json({
        message: "Email is Required",
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
    const userAlreadyExist = await findUserByEmail(email);
    if (userAlreadyExist) {
      return res.status(400).json({
        message: "😕 User Already Exist",
      });
    }
    const user = await createUser({ userName, password, email });
    //  calling the jwtToken function
    const jwtToken = createJwtToken(user.id);
    res.cookie("jwtToken", jwtToken);
    return res.status(201).json({
      message: "🎉 user Created Successfully",
      user: {
        id: user.id,
        userName: user.userName,
        password: user.password,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(">>>>Error", error);
    return res.status(500).json({
      message: `Internal Server Error, ${error}`,
    });
  }
};

export const UserLogin = async (req, res) => {
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

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        message: "😕 Admin Not Found!",
      });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({
        message: "Password InCorrect ❌",
      });
    }
    const jwtToken = createJwtToken(user.id);
    res.cookie("jwtToken", jwtToken);
    return res.status(201).json({
      message: "✅ User Loggied in Successfully",
      user: {
        id: user.id,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    (console.log("error", error),
      res.status(500).json({
        message: "Internal server error",
      }));
  }
};

export const userLogout = (req, res) => {
  try {
    res.clearCookie("jwtToken");
    res.status(202).json({
      message: " User Successfully logged Out 🎉",
    });
  } catch (error) {
    res.status(401).json({
      message: `Internal server error  ${error}`,
    });
  }
};
