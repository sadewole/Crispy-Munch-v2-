import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import helper from './middlewares/helper';
import models from './models';
import 'dotenv/config';
import { OAuth2Strategy } from 'passport-google-oauth';
import facebookTokenStrategy from 'passport-facebook-token';
import uuidv4 from 'uuid/v4';

const { User, FbAuth, LocalAuth, GoogleAuth } = models;

// init passport JWTStrategy
passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findOne({
          where: {
            id: payload.sub,
          },
        });

        //  confirm user existence
        if (!user) return done(null, false);
        // check if user is activated
        if (user.active === false) return done(null, false);

        return done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// init passport JWTStrategy for forgot password
passport.use(
  'forgot',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('active_token'),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await LocalAuth.findOne({
          where: {
            id: payload.sub,
          },
        });

        //  confirm user existence
        if (!user) return done(null, false);

        return done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// init passport facebook strategy
passport.use(
  'facebookToken',
  new facebookTokenStrategy(
    {
      clientID: process.env.FB_OAUTH_ID,
      clientSecret: process.env.FB_OAUTH_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check for existing email
        const existingUser = await helper.existEmail(profile.emails[0].value);
        if (existingUser) {
          return done(null, existingUser);
        }

        // create new user with google
        const user = await User.create({
          id: uuidv4(),
          email: profile.emails[0].value,
          name: profile.displayName,
        });
        // create a google signin clone
        await FbAuth.create({
          id: uuidv4(),
          facebook_id: profile.id,
          email: profile.emails[0].value,
          user_id: user.id,
          role: 'CLIENT',
        });
        // create a local signin clone
        await LocalAuth.create({
          id: uuidv4(),
          email: profile.emails[0].value,
          user_id: user.id,
        });

        return done(null, user);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// init passport localStrategy
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        // confirm email
        email = email.toLowerCase().trim();
        const user = await helper.existLocalEmail(email);
        // if not user
        if (!user) return done(null, false);

        // confirm password
        const comparePassword = await helper.comparePassword(
          password,
          user.password
        );

        // check validity && password
        if (!comparePassword) return done(null, false);

        // if passed, return user from User model
        const gUser = await helper.existEmail(user.email);
        return done(null, gUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
