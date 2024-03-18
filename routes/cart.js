import express from 'express';

import controller from '../controller/cart.js'


const router = express.Router()

router.route('/')

    .get(controller.getEntireCart)


router.route('/:id')

    .post(controller.addToCart)

    .delete(controller.deleteFromCart)


export default router;