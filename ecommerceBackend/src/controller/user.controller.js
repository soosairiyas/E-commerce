import {
  userRegistrationService,
  userLoggedInService,
} from "../service/user.service.js";

export const userRegistration = async function (req, res) {
  try {
    let { userName = "", email = "", password = "" } = req.body;
    userName = userName.trim();
    email = email.trim().toLowerCase();
    password = password.trim();

    const user = await userRegistrationService({ userName, email, password });
    res.cookie("userjwtToken", user.data.jwtToken);
    return res.status(201).json({
      message: user.message,
      data: {
        id: user.data.id,
        userName: user.data.userName,
        email: user.data.email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const UserLogin = async function (req, res) {
  try {
    let { email = "", password = "" } = req.body;
    email = email.trim().toLowerCase();
    password = password.trim();

    const user = await userLoggedInService({ email, password });
    res.cookie("userjwtToken", user.jwtToken);

    return res.status(201).json({
      message: user.message,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const userLogout = (req, res) => {
  try {
    res.clearCookie("userjwtToken");
    res.status(202).json({
      message: " User Successfully logged Out 🎉",
    });
  } catch (error) {
    res.status(401).json({
      message: `Internal server error  ${error}`,
    });
  }
};
