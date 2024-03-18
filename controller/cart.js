import { getCart, removeFromCart, insert, addToCart} from "../models/cart.js";

export default {

        getEntireCart : async (req, res) => {

            res.send(await getCart())

        },

        addToCart : async (req, res) => {

            let { quantity } = req.body

            let { userID } = req.query

            await insert(+req.params.id, userID, quantity)

            res.send(await getCart())

        },

        deleteFromCart : async (req, res) => {

            await removeFromCart(+req.params.id)

            res.send(await getCart())
        }
};
