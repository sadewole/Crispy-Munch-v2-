import express from 'express';
import passport from 'passport';
import menuController from '../../controller/menuController';
import uploads from '../../middlewares/multer';
import '../../passport'


const router = express.Router();

router
  .route('/menu')
<<<<<<< HEAD
  .get(menuController.getAllMenu)
=======
  .get(passport.authenticate('jwt', {
    session: false
  }), menuController.getAllMenu)
>>>>>>> 6fa43df6ba601265ff777572ca73d312480d2e4a
  .post(
    passport.authenticate('jwt', {
      session: false
    }),
    uploads.single('image'),
    menuController.addFood
  );

router
  .route('/menu/:id')
  .get(passport.authenticate('jwt', {
    session: false
  }), menuController.getSingleFood)
  .put(
    passport.authenticate('jwt', {
      session: false
    }),
    uploads.single('image'),
    menuController.updateFood
  )
  .delete(passport.authenticate('jwt', {
    session: false
  }), menuController.deleteFood);

export default router;