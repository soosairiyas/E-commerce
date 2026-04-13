import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// common JWT Token Create Function for User
const maxage = 1 * 24 * 60 * 60;
const createJwtToken = (id) => {
  return jwt.sign({ id }, "backendecommerceuser", {
    expiresIn: maxage,
  });
};

export const userRegistrationService = async function ({
  userName,
  email,
  password,
}) {
  if (!userName && !email && !password) {
    throw new Error(" UserName and Email and Password are Required !");
  }
  if (!userName) {
    throw new Error("userName is Required !");
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
  const existingUser = await User.findOne({
    where: { email },
  });
  if (existingUser) {
    throw new Error("User Aleady Exist 😕");
  }
  const hashingPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    userName,
    email,
    password: hashingPassword,
  });

  const jwtToken = createJwtToken(user.id);
  return {
    message: "User Registered Successfully 🎉",
    data: {
      id: user.id,
      userName: user.userName,
      email: user.email,
      jwtToken,
    },
  };
};
export const userLoggedInService = async function ({ email, password }) {
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

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("User is Not Found 😕");
  }
  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    throw new Error("Password Incorrect ❌");
  }

  const jwtToken = createJwtToken(user.id);

  return {
    message: "✅ Logged In Successfully",
    data: {
      id: user.id,
      email: user.email,
    },
    jwtToken,
  };
};
