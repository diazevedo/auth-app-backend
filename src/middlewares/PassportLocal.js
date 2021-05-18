import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";

import User from "../schemas/User.js";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async function (email, password, done) {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false);
      }

      const isPasspordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasspordCorrect) {
        return done(null, false);
      }

      return done(null, user);
    }
  )
);

export default passport;
