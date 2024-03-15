import express from "express";
import { getCart, postCart, deleteCartItem } from "../controllers/cartController.js";

const router = express.Router();

router.get("/users/:id/cart", getCart);
router.post("/users/:id/cart", postCart);
router.delete("/users/:id/cart/:cartID", deleteCartItem);

export default router;
