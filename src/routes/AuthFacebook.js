import { Router } from "express";
import passport from "passport";

import "../middlewares/PassportFacebook.js";

const routes = Router();

routes.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "email, user_photos" })
);

routes.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/auth/facebook/loggedin",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

routes.get("/auth/facebook/loggedin", function (req, res) {
  res.redirect(process.env.APP_REDIRECT_URL);
});

export default routes;
