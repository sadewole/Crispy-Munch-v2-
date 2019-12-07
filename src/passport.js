import {
    Strategy as JWTStrategy
} from 'passport-jwt'
import {
    Strategy as LocalStrategy
} from 'passport-local'
import passport from 'passport'
import helper from './middlewares/helper'


// init passport localStrategy
passport.use('local', new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // confirm email
        const {
            rows
        } = await helper.existEmail(email)
        const user = rows[0]
        // if not user
        if (!user) return done(null, false)

        // confirm password
        const comparePassword = await helper.comparePassword(user.password, password)
        if (!comparePassword) return done(null, false)

        // if passed
        return done(null, user)

    } catch (error) {
        return done(error, null)
    }
}))