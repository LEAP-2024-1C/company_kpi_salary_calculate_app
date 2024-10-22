import jwt from "jsonwebtoken";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_TOKEN_KEY || "", {
    expiresIn: "1h",
  });
};
