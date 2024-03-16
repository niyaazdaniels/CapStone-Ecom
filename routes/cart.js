// routes.js
import express from "express";

import controller from '../controller/cart.js';

const router = express.Router();

// add to cart
router
    .route('/cartItem')
    .post(controller.addItems);

// get a item in cart
router
    .route('cartItem/:userID/:prodID')
    .get(controller.getItem)

// get all items by user id
router
    .route('/cartItem/:userID"')
    .get(controller.allItems);

// update item qty
router
    .route('/cartItem')
    .patch(controller.updateItem);

// delete a item in cart
router
    .route('/cartItem/:userID/:prodID')
    .delete(controller.deleteItem);

// delete all items in cart
router
    .route('/cartItem/:userID')
    .delete(controller.deleteItems);

export default router;
