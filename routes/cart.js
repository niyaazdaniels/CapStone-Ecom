import express from 'express';

import controller from '../controller/cart.js'

const router = express.Router()


router

      .route('/:cartID')

          .get(controller.getCartItems) 

          .patch(controller.updateCartItems)

          .delete(controller.deleteCartItems)

          .post(controller.addCartItems)

      


    export default router  