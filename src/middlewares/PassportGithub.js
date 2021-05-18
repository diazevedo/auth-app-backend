import passport from "passport";
import GithubStrategy from "passport-github2";

import User from "../schemas/User.js";

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_APP_KEY,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.APP_URL}/auth/github/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await User.findOne({ uiid: profile.id });

      if (user) return done(null, user);

      const userCreated = await User.create({
        uiid: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        bio: profile._json.bio || "",
      });

      //https://avatars.githubusercontent.com/u/21248648?v=4

      return done(null, userCreated);
    }
  )
);

export default passport;
