import { getCart, addToCart, insert, removeFromCart } from "../models/cart.js";

export default {
    getAllCartItems : async (req, res) => {
        res.send(await getCart())
    },
    addItemsToCartTable : async (req, res) => {
        console.log(req.query);
        console.log(+req.params.id);
        let { quantity } = req.body
        let { userID } = req.query
        await insert(+req.params.id, userID, quantity)
        res.send(await getCart())
    },
    deleteItemsFromCart : async (req, res) => {
        await removeFromCart(+req.params.id)
        res.send(await getCart())
    }
} 
