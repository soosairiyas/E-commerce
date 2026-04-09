import jwt from "jsonwebtoken";

export const reqAuth = (req, res, next) => {
  const jwtToken = req.cookie.jwtToken;
  console.log("token", jwtToken);

  if (jwtToken) {
    jwt.verify(jwtToken, "backendecommerce", (err, decodedToken) => {
      if (err) {
        console.log("❌ Invalid JWT Token");
      } else {
        console.log("DecodedToken", decodedToken);
        next();
      }
    });
  } else {
    console.log("sorry you cannot access the product page");
    res.status(401).json({
      message: " First loggin to access the product page",
    });
  }
};
