import express from 'express';
import controller from '../controller/cart.js'


const router = express.Router()


router

    .route('/:prodID')
         
    .post(controller.addItemsToCart)

    .get(controller.getItemsFromCart) 
    
    .patch(controller.updateItemInCart)

router

    .route('/drop/:userID')
         
    .delete(controller.deleteCart)

router    
    .route('/delete/:cartID')

    .delete(controller.deleteItemsInCart)
    
export default router  