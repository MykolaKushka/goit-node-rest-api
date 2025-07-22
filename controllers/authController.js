import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar"; 
import path from "path";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET = "defaultsecret" } = process.env;

const avatarsDir = path.resolve("public", "avatars");

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

    await User.update({ token }, { where: { id: user.id } });

    res.json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { id } = req.user;
    await User.update({ token: null }, { where: { id } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription, avatarURL } = req.user;
    res.json({ email, subscription, avatarURL });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw HttpError(400, "Avatar file is required");
    }

    const { path: tempPath, originalname } = req.file;
    const ext = path.extname(originalname);
    const fileName = `${nanoid()}${ext}`;
    const newPath = path.join(avatarsDir, fileName);

    await fs.rename(tempPath, newPath);

    const avatarURL = `/avatars/${fileName}`;
    await User.update({ avatarURL }, { where: { id: req.user.id } });

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
