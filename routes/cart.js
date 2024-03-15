// routes.js
import express from "express";

import controller from '../controller/cart.js';

const router = express.Router();

router.get("/users/:id/cart",controller.getCartHandler);

router.post("/users/:id/cart",controller.addToCartHandler); 

router.delete("/users/:id/cart/:cartID",controller.deleteFromCartHandler);

export default router;
