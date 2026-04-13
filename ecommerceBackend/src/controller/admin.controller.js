import {
  registeredAdminService,
  adminLoginService,
} from "../service/admin.service.js";

export const RegisterAdmin = async function (req, res) {
  try {
    let { email = "", password = "" } = req.body;
    email = email.trim().toLowerCase();
    password = password.trim();
    const admin = await registeredAdminService({ email, password });
    res.cookie("adminjwtToken", admin.jwtToken);

    return res.status(201).json({
      message: admin.message,
      data: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const adminLogin = async function (req, res) {
  try {
    let { email = "", password = "" } = req.body;
    email = email.trim().toLowerCase();
    password = password.trim();

    const result = await adminLoginService({ email, password });
    res.cookie("adminjwtToken", result.jwtToken);

    return res.status(201).json({
      message: result.message,
      data: {
        id: result.admin.id,
        email: result.admin.email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
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
