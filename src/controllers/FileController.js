import mongoose from "mongoose";

import DB from "../database/index.js";

class FileController {
  async index(req, res) {
    try {
      const stream = await DB.stream_file(req.params.filename);
      stream.pipe(res);
    } catch (error) {
      res.status(401).json({ error });
    }
  }

  store(req, res) {
    try {
      const file = {
        id: req.file.id,
        filename: req.file.filename,
        originalname: req.file.metadata.originalname,
      };

      return res.status(201).json({ file });
    } catch (error) {
      return res.status(401).json({ error });
    }
  }
}

export default new FileController();
