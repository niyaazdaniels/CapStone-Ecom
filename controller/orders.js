import { fetchExistingOrders, fetchExistingOrder, insertNewOrder, updateExistingOrder, removeExistingOrder } from "../models/orders.js";

export default {
     fetchAllOrders: async (req, res) => {
        try {
            await fetchExistingOrders(req, res);
        } catch (error) {
            console.error("Error Fetching Orders:", error);
            res.status(500).json({ success: false, error: "Failed to fetch orders" });
        }
    },
    fetchSingleOrder: async (req, res) => {
        try {
            const orderId = +req.params.orderID;
            
            const order = await fetchExistingOrder(orderId); 
            if (order) {
                res.send(order);
            } else {
                res.status(404).send({ error: "No Order Found" });
            }
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    },
    
    addSingleOrder: async (req, res) => {
        try {
            const { prodName, price, orderDate, prodImage} = req.body

            const push = await insertNewOrder( prodName, price, orderDate, prodImage)

            res.send(await fetchOrders());
        } catch (error) {
            console.error ("Error Adding Order:", error)
            res.status(500).send({ error: "An Error Occured While Adding The Product!"})
        }
    },
    editSingleOrder: async (req, res) => {
        try {
            const [order] = await fetchOrder(+req.params.orderID)

            let {prodName, price, orderDate, prodImage} = req.body;

            prodName = prodName || order.prodName;
            price = price || order.price;
            orderDate = orderDate || order.orderDate;
            prodImage = prodImage || order.prodImage;

            await updateExistingOrder(prodName, price, orderDate, prodImage, +req.params.orderID);

            res.json(await fetchOrders())
        } catch (error) {
            res.status(500).json({error: "An Error Occured While Editing The Order!"})
        }
    },
    deleteSingleOrder: async (req, res) => {
        try {
            const orderId = +req.params.orderID;

            const removedOrder = await removeExistingOrder(orderId);

            if (removedOrder) {
                res.send({
                    message: "Order Deleted Successfully!"
                });
            }else {
                res.status(404).send({ error: "No Order Found Matching That ID"});
            }
        } catch (error) {
            res.status(500).send({error: "Internal Server Error Has Occurred."})
        }
    }
};