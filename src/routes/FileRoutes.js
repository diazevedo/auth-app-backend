import { Router } from "express";
import FileController from "./../controllers/FileController.js";

import file from "../config/multer.js";

const routes = Router();

routes.get("/files/:filename", FileController.index);
routes.post("/files", file.single("file"), FileController.store);

export default routes;
