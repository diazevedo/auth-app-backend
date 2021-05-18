import { Router } from "express";
import passport from "passport";

import "../middlewares/PassportGithub.js";

const routes = Router();

routes.get("/auth/github", passport.authenticate("github"));

routes.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: process.env.APP_REDIRECT_URL,
    failureRedirect: "/login",
  })
);

export default routes;
