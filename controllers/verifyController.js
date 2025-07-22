import User from "../models/user.js";
import HttpError from "../helpers/HttpError.js";

export const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ where: { verificationToken } });

    if (!user) {
      throw HttpError(404, "User not found");
    }

    await User.update(
      { verify: true, verificationToken: null },
      { where: { id: user.id } }
    );

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};
