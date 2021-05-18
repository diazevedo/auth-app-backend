import { Router } from "express";
import SessionCheck from "../middlewares/SessionCheck.js";
import UserController from "./../controllers/User.js";

const routes = Router();

routes.post("/users", UserController.store);
routes.get("/users", SessionCheck, UserController.index);
routes.put("/users", SessionCheck, UserController.update);

export default routes;
