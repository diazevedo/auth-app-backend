import { Router } from "express";
import passport from "passport";

import "../middlewares/PassportGoogle.js";

const routes = Router();

routes.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

routes.get(
  "/auth/google/loggedin",
  passport.authenticate("google", {
    successRedirect: process.env.APP_REDIRECT_URL,
    failureRedirect: "/login",
  })
);

export default routes;
