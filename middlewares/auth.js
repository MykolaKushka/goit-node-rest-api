import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";

dotenv.config();

const { JWT_SECRET = "defaultsecret" } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw HttpError(401, "Not authorized");
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      throw HttpError(401, "Not authorized");
    }

    const user = await User.findByPk(decoded.id);
    if (!user || user.token !== token) {
      throw HttpError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;