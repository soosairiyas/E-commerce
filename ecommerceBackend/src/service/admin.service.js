import { Admin } from "../model/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// common JWT Token Create Function
const maxage = 1 * 24 * 60 * 60;
const createJwtToken = (id) => {
  return jwt.sign({ id }, process.env.ADMIN_JWT_SECRET, {
    expiresIn: maxage,
  });
};

export const registeredAdminService = async function ({ email, password }) {
  console.log(">>>>email", email);
  if (!email && !password) {
    throw new Error("Email and Password are Required !");
  }
  if (!email) {
    throw new Error("Email is Required !");
  }
  if (!password) {
    throw new Error("Password is Required!");
  }
  if (password.length < 6 || password.length > 10) {
    throw new Error("Password should be between 6 and 10 char");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    throw new Error("Invalid Email address");
  }

  const existingAdmin = await Admin.findOne({ where: { email } });
  if (existingAdmin) {
    throw new Error("Admin Already Exist 😕");
  }
  const hashingPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({
    email,
    password: hashingPassword,
  });
  const jwtToken = createJwtToken(admin.id);
  return {
    message: "🎉 Admin Created Successfully",
    id: admin.id,
    email: admin.email,
    jwtToken,
  };
};
export const adminLoginService = async function ({ email, password }) {
  if (!email && !password) {
    throw new Error("Email and Password are Required !");
  }
  if (!email) {
    throw new Error("Email is Required !");
  }
  if (!password) {
    throw new Error("Password is Required!");
  }
  if (password.length < 6 || password.length > 10) {
    throw new Error("Password should be between 6 and 10 char");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    throw new Error("Invalid Email address");
  }
  const admin = await Admin.findOne({ where: { email } });
  if (!admin) {
    throw new Error("😕 Admin Not Found");
  }
  const auth = await bcrypt.compare(password, admin.password);
  if (!auth) {
    throw new Error("Password Incorrect ❌");
  }

  const jwtToken = createJwtToken(admin.id);

  return {
    message: "✅ Logged In Successfully",
    admin,
    jwtToken,
  };
};
