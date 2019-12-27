import express from 'express';
import passport from 'passport';
import helper from '../../middlewares/helper'
import orderController from '../../controller/orderController';
import '../../passport'

const router = express.Router();
const {
  validateBody,
  schemas
} = helper



router
  .route('/order')
  .get(orderController.getAllOrder)
  .post(
    passport.authenticate('jwt', {
      session: false
    }), validateBody(schemas.addNewOrderSchema),
    orderController.addNewOrder
  );


router
  .route('/order/:id')
  .get(orderController.getSingleOrder)
  .put(
    passport.authenticate('jwt', {
      session: false
    }),
    orderController.updateQuantity
  )
  .patch(
    passport.authenticate('jwt', {
      session: false
    }),
    orderController.updateStatus
  )
  .delete(
    passport.authenticate('jwt', {
      session: false
    }),
    orderController.deleteOrder
  );

router.route('/user/order').get(
    passport.authenticate('jwt', {
      session: false
    }),
    orderController.getUserHistory
  )
  .put(
    passport.authenticate('jwt', {
      session: false
    }), validateBody(schemas.updateUserOrdersSchema),
    orderController.updateUserOrders
  );

router.route('/order/total').get(
  passport.authenticate('jwt', {
    session: false
  }),
  orderController.totalPendingPayment
);



export default router;