import { getAllItems, getAItem, insertToCart, updateCartItemQty, deleteItemInCart, deleteAllItemsByUser } from "../models/CartModel.js";

export default {

    // get all Items
    allItems: async (req, res) => {

        await getAllItems(+req.params.userID, (err, results) => {

            if (err) {

                res.send(err);

            } else {
                res.json(results);
            }
        });
    },

    // get a Item
    getItem: async (req, res) => {

        const userID = +req.params.userID;

        const prodID = +req.params.prodID;

        await getAItem(userID, prodID, (err, results) => {

            if (err) {

                res.send(err);

            } else {

                res.json(results);
            }
        });
    },

    // add to cart
    addItems: async (req, res) => {

        const data = req.body;

        await insertToCart(data, (err, results) => {

            if (err) {

                res.send(err);

            } else {

                res.json(results);

            }
        });
    },

    // update Item
    updateItem: async (req, res) => {

        const data = req.body;

        await updateCartItemQty(data, (err, results) => {

            if (err) {

                res.send(err);

            } else {

                res.json(results);
            }
        });
    },

    // delete a item in cart
    deleteItem: async (req, res) => {

        const userID = +req.params.userID;

        const prodID = +req.params.prodID;

        await deleteItemInCart(userID, prodID, (err, results) => {

            if (err) {

                res.send(err);

            } else {

                res.json(results);

            }
        });
    },

    // delete all items in cart
    deleteItems: async (req, res) => {

        await deleteAllItemsByUser(+req.params.userID, (err, results) => {

            if (err) {

                res.send(err);

            } else {

                res.json(results);

            }
        });
    }
};
