import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "./user.model.js";

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    console.log("profile Data: ", profile);

    console.log("accessToken and refreshToken: ", { accessToken, refreshToken })
    User.findOneAndUpdate(
        { googleId: profile.id },
        { googleId: profile.id, profile: profile, accessToken: accessToken, refreshToken: refreshToken, email: profile.emails[0].value },
        {
            upsert: true,
            new: true,
        },
    )
        .then(user => done(null, user))
        .catch(err => done(err, null));
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});