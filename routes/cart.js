// routes.js
import express from "express";
import {getCartHandler,addToCartHandler,deleteFromCartHandler} from '../controller/cart.js';

const router = express.Router();

router.get("/users/:id/cart",getCartHandler);
router.post("/users/:id/cart",addToCartHandler); 
router.delete("/users/:id/cart/:cartID",deleteFromCartHandler);

export default router;
