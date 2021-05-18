import { Router } from "express";

import userRoutes from "./UserRoutes.js";
import googleRoutes from "./AuthGoogle.js";
import FacebookRoutes from "./AuthFacebook.js";
import TwitterRoutes from "./AuthTwitter.js";
import GithubRoutes from "./AuthGithub.js";
import FileRoutes from "./FileRoutes.js";
import LocalRoutes from "./AuthLocal.js";

import authCheck from "../middlewares/SessionCheck.js";

const routes = Router();

routes.use(userRoutes);
routes.use(googleRoutes);
routes.use(FacebookRoutes);
routes.use(TwitterRoutes);
routes.use(GithubRoutes);
routes.use(FileRoutes);
routes.use(LocalRoutes);

routes.get("/", authCheck, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

routes.get("/logout", (req, res) => {
  req.logout();
  res.status(205).json({ success: true });
});

routes.get("/user", (req, res) => {
  res.json({ user: req.user }); // The req.user stores the entire user that has been authenticated inside of it.
});

export default routes;
