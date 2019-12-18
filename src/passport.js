import {
  Strategy as JWTStrategy,
  ExtractJwt
} from 'passport-jwt';
import {
  Strategy as LocalStrategy
} from 'passport-local';
import passport from 'passport';
import helper from './middlewares/helper';
import model from './db';
import 'dotenv/config';
import googleTokenStrategy from 'passport-google-plus-token';
import facebookTokenStrategy from 'passport-facebook-token';
import uuidv4 from 'uuid/v4'

const {
  User,
  FbAuth,
  LocalAuth,
  GoogleAuth
} = model



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

// init passport JWTStrategy for forgot password
passport.use(
  'forgot',
  new JWTStrategy({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('active_token'),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {
      console.log('exp' + payload.exp, 'newDate' + Date.now())
      try {
        if (payload.exp > Date.now()) {
          console.log(true)
        }
        const user = await LocalAuth.findOne({
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
      try {
        console.log('access token', accessToken)
        console.log('refresh token', refreshToken)
        console.log('profile', profile)
        // check for existing email
        const existingUser = await helper.existEmail(profile.emails[0].value);
        if (existingUser) {
          return done(null, existingUser)
        }

        // create new user with google
        const user = await User.create({
          id: uuidv4(),
          email: profile.emails[0].value,
          name: profile.displayName
        })
        // create a google signin clone
        await GoogleAuth.create({
          id: uuidv4(),
          google_id: profile.id,
          email: profile.emails[0].value,
          user_id: user.id
        })
        // create a local signin clone
        await LocalAuth.create({
          id: uuidv4(),
          email: profile.emails[0].value,
          active: true,
          user_id: user.id
        })

        return done(null, user)
      } catch (error) {
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
        const user = await LocalAuth.findOne({
          where: {
            email
          }
        });
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
        // if passed, return user from User model
        const gUser = await helper.existEmail(user.email);
        return done(null, gUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);