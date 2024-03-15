    import express from 'express';
import controller from '../controller/cart.js'


const router = express.Router()

router.route('/')
    .get(controller.getAllCartItems)


router.route('/')
    .post(controller.addItemsToCartTable)
    .delete(controller.deleteItemsFromCart)


export default router;
