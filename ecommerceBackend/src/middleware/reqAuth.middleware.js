import jwt from "jsonwebtoken";

export const reqAuth = (req, res, next) => {
  const adminToken = req.cookies.adminjwtToken;
  const userToken = req.cookies.userjwtToken;

  if (!adminToken && !userToken) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  try {
    if (adminToken) {
      const decoded = jwt.verify(adminToken, "backendecommerce");
      req.admin = decoded;
      req.role = "admin";
    } else {
      const decoded = jwt.verify(userToken, "backendecommerceuser");
      req.user = decoded;
      req.role = "user";
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({
      message: "You are not allowed to perform this action",
    });
  }
  next();
};
