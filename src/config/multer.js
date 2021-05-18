import multer from "multer";
import crypto from "crypto";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import GridFsStorage from "multer-gridfs-storage";

const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const fileInfo = {
          filename: uuidv4(),
          bucketName: "profile-images",
          metadata: {
            userId: req.user._id,
            originalname: file.originalname,
          },
        };
        resolve(fileInfo);
      });
    });
  },
});

const Multer = multer({
  storage,
});

export default Multer;
