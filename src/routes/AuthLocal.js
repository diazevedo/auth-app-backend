import { Router } from "express";
import passport from "passport";

import "../middlewares/PassportLocal.js";

const routes = Router();

routes.post(
  "/login",
  function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      req.logIn(user, (err) => {
        if (err) {
          req.error = "error";
        }
      });

      next();
    })(req, res, next);
  },
  (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "not found" });

    return res.status(200).json({ message: "ok" });
  }
);

export default routes;
