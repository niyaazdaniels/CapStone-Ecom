import express from 'express';
import controller from '../controller/cart.js'


const router = express.Router()


router

    .route('/:prodID')
         
    .post(controller.addItemsToCart)

    .get(controller.getItemsFromCart) 
    
    .patch(controller.updateItemInCart)
    
    .delete(controller.deleteItemsInCart)

    export default router  