import jwt from "jsonwebtoken";
import { Profile } from "../Models/ProfileModal.js";
export const verifyUser = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Profile.findOne({userId:decoded.id})
      req.user.token = token;
      next();
    } catch (error) {
      res.status(403).json("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(403).json("Not authorized, no token");
  }
};
export const verifyAdmin = async (req, res, next) => {
  if (req.user.aleas === "admin") {
    next();
  } else {
    res.status(403).json("Not authorized, You are Not Admin");
  }
};
