import {
    Router
} from 'express';
import helper from '../../middlewares/helper';
import user from '../../controller/user'
import passport from 'passport'

// init Router
const router = Router();

// Routes post signup
// Access public
router
    .route('/signup')
    .post(helper.validateBody(helper.schemas.authSchema), user.signup);

// Routes post signin
// Access public
router
    .route('/signin')
    .post(passport.authenticate('local', {
        session: false
    }), helper.validateBody(helper.schemas.signSchema), user.signin);

export default router;