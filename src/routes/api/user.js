import {
  Router
} from 'express';
import helper from '../../middlewares/helper';
import user from '../../controller/user';
import passport from 'passport';
import '../../passport'; // as strategy in ./passport.js needs passport object

// init Router
const router = Router();

// Routes post signup
// Access public
router
  .route('/signup')
  .post(helper.validateBody(helper.schemas.authSchema), user.signup);

// Routes post signin
// Access public
router.route('/signin').post(
  passport.authenticate('local', {
    session: false
  }),
  helper.validateBody(helper.schemas.signSchema),
  user.signin
);

// Routes 3rd party signin with google
// Access public
router.route('/oauth/google').post(
  passport.authenticate('googleToken', {
    session: false
  }),
  user.signin
);

// Routes post signin
// Access private
router.route('/secret').get(
  passport.authenticate('jwt', {
    session: false
  }),
  user.secret
);

export default router;