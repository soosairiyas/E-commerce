import jwt from "jsonwebtoken";

export const reqAuth = function (req, res, next) {
  const token = req.cookies.jwtToken;
  console.log(">>>JWtToken", token);

  if (token) {
    jwt.verify(token, "backendecommerceuser", (err, decodedToken) => {
      if (err) {
        console.log("❌ Invalid JWT Token");
      } else {
        console.log("DecodedToken", decodedToken);
        next();
      }
    });
  } else {
    console.log("sorry you cannot access the side");
    res.status(401).json({
      message: " First loggin to access the side",
    });
  }
};
