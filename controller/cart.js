    import { getCart, addToCart, deleteFromCart } from "../models/cart.js";
    import express from "express";

    const router = express.Router();

    router.get("/users/:id/cart", (req, res) => {
    getCart(req, res);
    });

    router.post("/users/:id/cart", (req, res) => {
    addToCart(req, res);
    });

    router.delete("/users/:id/cart/:cartID", (req, res) => {
    deleteFromCart(req, res);
    });
    export default router;
