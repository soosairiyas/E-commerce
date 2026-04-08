import { Admin } from "../model/admin.model.js";
import bcrypt from "bcrypt";

export const createAdmin = async (data) => {
  const hashingPassword = await bcrypt.hash(data.password, 10);

  return Admin.create({
    email: data.email,
    password: hashingPassword,
  });
};

export const findAdmin = async (email) => {
  return Admin.findOne({
    where: { email },
  });
};
