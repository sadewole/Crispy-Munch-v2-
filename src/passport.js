import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import helper from './middlewares/helper';
import db from './model/index';
import 'dotenv/config';

// init passport JWTStrategy
passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {
      try {
        const text = `SELECT * from users where id = $1`;
        console.log(payload);
        const user = await db.query(text, [payload.sub]);

        //  confirm user existence
        if (!user) return done(null, false);

        return done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// init passport localStrategy
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        // confirm email
        const { rows } = await helper.existEmail(email);
        const user = rows[0];
        // if not user
        if (!user) return done(null, false);

        // confirm password
        const comparePassword = await helper.comparePassword(
          password,
          user.password
        );
        if (!comparePassword) return done(null, false);

        // if passed
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
