// controller/cart.js
import { getCart, addToCart, deleteFromCart } from "../models/cart.js";

const getCartHandler = (req, res) => {
    getCart(req, res);
};
  
const addToCartHandler = (req, res) => {
    addToCart(req, res);
};
  
const deleteFromCartHandler = (req, res) => {
    deleteFromCart(req, res);
};

export { getCartHandler, addToCartHandler, deleteFromCartHandler };
