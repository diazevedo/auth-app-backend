import { Router } from "express";
import passport from "passport";

import "../middlewares/PassportTwitter.js";

const routes = Router();

routes.get("/auth/twitter", passport.authenticate("twitter"));

routes.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "/auth/twitter/loggedin",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

routes.get("/auth/twitter/loggedin", function (req, res) {
  res.json({ message: "TWITTER", user: req.user });
});

export default routes;
