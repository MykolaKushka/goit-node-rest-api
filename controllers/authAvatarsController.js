import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const avatarsDir = path.join(__dirname, "../public/avatars");

export const updateAvatar = async (req, res, next) => {
  try {
    const { id } = req.user;

    if (!req.file) {
      throw HttpError(400, "Avatar file is required");
    }

    const { path: tempPath, originalname } = req.file;
    const ext = path.extname(originalname);
    const filename = `${id}_${Date.now()}${ext}`;
    const resultPath = path.join(avatarsDir, filename);

    const image = await Jimp.read(tempPath);
    await image.cover(250, 250).quality(70).writeAsync(resultPath);

    await fs.unlink(tempPath);

    const avatarURL = `/avatars/${filename}`;
    await User.update({ avatarURL }, { where: { id } });

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};