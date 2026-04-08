import { createAdmin, findAdmin } from "../service/admin.service.js";

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
    console.log(">>>Admin", admin);
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
      message: `Internal Server Error, ${error.message}`,
    });
  }
};
