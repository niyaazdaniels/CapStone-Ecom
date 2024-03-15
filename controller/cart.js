import { getCart, addToCart, deleteFromCart } from "../models/cart.js";

export default {

    getCartHandler: async (req, res) => {

        await getCart(req, res);

    },

    addToCartHandler: async (req, res) => {

        await addToCart(req, res);

    },

    deleteFromCartHandler: async (req, res) => {

        await deleteFromCart(req, res);
        
    }
};

