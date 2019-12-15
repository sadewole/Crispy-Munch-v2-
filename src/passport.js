import {
  Strategy as JWTStrategy,
  ExtractJwt
} from 'passport-jwt';
import {
  Strategy as LocalStrategy
} from 'passport-local';
import passport from 'passport';
import helper from './middlewares/helper';
import User from './model';
import 'dotenv/config';
import googleTokenStrategy from 'passport-google-plus-token';
import facebookTokenStrategy from 'passport-facebook-token';

// init passport JWTStrategy
passport.use(
  'jwt',
  new JWTStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {
      try {
        const user = await User.findOne({
          where: {
            id: payload.sub
          }
        });

        //  confirm user existence
        if (!user) return done(null, false);
        // check if user is activated
        if (user.active === false) return done(null, false)

        return done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// init passport google strategy
passport.use(
  'googleToken',
  new googleTokenStrategy({
      clientID: process.env.Google_ID,
      clientSecret: process.env.Google_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {} catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// init passport facebook strategy
passport.use(
  'facebook',
  new facebookTokenStrategy({
      clientID: process.env.FB_OAUTH_ID,
      clientSecret: process.env.FB_OAUTH_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      try {} catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// init passport localStrategy
passport.use(
  'local',
  new LocalStrategy({
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        // confirm email
        email = email.toLowerCase()
        const user = await helper.existEmail(email);
        // if not user
        if (!user) return done(null, false);

        // confirm password
        const comparePassword = await helper.comparePassword(
          password,
          user.password
        );


        // check validity && password
        if (!comparePassword) return done(null, false);

        // check if user is activated
        if (user.active === false) return done(null, false)
        // if passed
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);