import multer from "multer";
import path from "path";
import fs from "fs/promises";

const tempDir = path.resolve("temp");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await fs.mkdir(tempDir, { recursive: true });
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniquePrefix}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;