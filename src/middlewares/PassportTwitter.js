import passport from "passport";
import TwitterStrategy from "passport-twitter";

import User from "../schemas/User.js";

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_APP_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: `/auth/twitter/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await User.findOne({ uiid: profile.id });

      if (user) return done(null, user);

      const userCreated = await User.create({
        uiid: profile.id,
        name: profile.displayName,
        bio: profile._json.description,
      });

      return done(null, userCreated);
    }
  )
);

export default passport;
