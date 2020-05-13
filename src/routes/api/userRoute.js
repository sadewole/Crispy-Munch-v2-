import {
  Router
} from 'express';
import helper from '../../middlewares/helper';
import userController from '../../controller/userController';
import passport from 'passport';
import '../../passport'; // as strategy in ./passport.js needs passport object

// init Router
const router = Router();

// Routes get all users
// Access Private
router.route('/user/').get(
  passport.authenticate('jwt', {
    session: false
  }),
  userController.getAllUser
);

// Routes post signup
// Access public
router
  .route('/user/signup')
  .post(helper.validateBody(helper.schemas.authSchema), userController.signup);

// Route validate account
// Access private
// code no longer use in this project
// router.route('/validate').put(userController.validate)

// Routes post signin
// Access public
router.route('/user/signin').post(
  passport.authenticate('local', {
    session: false
  }),
  helper.validateBody(helper.schemas.signSchema),
  userController.signin
);

// Routes 3rd party signin with google
// Access public
router.route('/user/oauth/google').post(userController.googleSign);

// Routes 3rd party signin with facebook
// Access public
router.route('/user/oauth/facebook').post(
  passport.authenticate('facebookToken', {
    session: false
  }),
  userController.signin
);

// Routes post signin
// Access private
router.route('/user/secret').get(
  passport.authenticate('jwt', {
    session: false
  }),
  userController.secret
);

// Routes post forgot password
// Access private
router
  .route('/user/verify')
  .post(userController.verifyEmail)
  .put(
    passport.authenticate('forgot', {
      session: false
    }),
    userController.changePassword
  );

// Routes @Desc single user
// Access Private
router
  .route('/user/:id')
  .get(userController.getSingleUser)
  .put(
    passport.authenticate('jwt', {
      session: false
    }),
    userController.upgradeUser
  )
  .delete(
    passport.authenticate('jwt', {
      session: false
    }),
    userController.deleteSingleUser
  );

export default router;