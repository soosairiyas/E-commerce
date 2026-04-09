import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";

export const createUser = async function (data) {
  const userhashedPassword = await bcrypt.hash(data.password, 10);
  return User.create({
    userName: data.userName,
    password: userhashedPassword,
    email: data.email,
  });
};

export const findUserByEmail = function (email) {
  return User.findOne({
    where: { email },
  });
};
