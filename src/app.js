import "dotenv/config.js";
import express from "express";
import cors from "cors";
import passport from "passport";
import routes from "./routes/index.js";
import cookieSession from "cookie-session";

import DB from "./database/index.js";
import User from "./schemas/User.js";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());

    this.server.use((req, res, next) => {
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });

    this.server.use(
      cors({
        origin: [
          "http://127.0.0.1:3000/",
          "http://127.0.0.1:3000",
          "http://localhost:3000",
          "http://localhost:3000/",
        ],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
        credentials: "include",
      })
    );

    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
      User.findById(id, async function (err, userFound) {
        const { name = "", bio = "", phone = "", email, _id } = userFound._doc;

        const user = Object.assign({}, { name, bio, phone, email, _id });
        user.file = {};
        try {
          user.file = await DB.getFile(user._id);
        } catch (error) {
          console.log(error);
        } finally {
          done(err, user);
        }
      });
    });

    this.server.use(
      cookieSession({
        name: "auth-app",
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.SESSION_SECRET],
        httpOnly: true,
      })
    );

    this.server.use(passport.initialize());
    this.server.use(passport.session());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
