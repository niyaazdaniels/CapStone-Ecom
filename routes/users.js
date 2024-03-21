import express from "express";

import userController from "../controller/users.js";

import cartController from "../controller/cart.js"

const router = express.Router();

router

    .route('/')

        .get(userController.getManyUsers) 

        .post(userController.registerOneUser);

router

    .route('/:userID')

        .get(userController.getOneUser) 

        .patch(userController.editOneUser)
         
        .delete(userController.deleteOneUser); 

router 
    .route('/:userID/cart')
    
    .post(cartController.addItemsToCart)

    .get(cartController.getItemsFromCart) 
    
    .patch(cartController.updateItemInCart)
    
    .delete(cartController.deleteItemsInCart)
   

export default router;