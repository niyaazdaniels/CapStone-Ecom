import express from 'express';

import controller from '../controller/cart.js'

const router = express.Router()


router

      .route('/:cartID')

          .get(controller.getCart) 

          .patch(controller.updateCartItems)

          .delete(controller.deleteFromCart)

          .post(controller.addToCart)



    export default router  