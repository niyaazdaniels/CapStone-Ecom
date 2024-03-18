import { getAllCarts , addToCart , deleteCart , updateCart , getCart , insertCart } from "../models/database.js";

export default {

   getCartItems: async (req,res)=> {

    res.send(await getAllCarts(+req.params.prodID))

   },

   addCartItems: async (req,res)=>{

    const { quantity } = req.body;

    const { user} = req.query

    await insertCart(quantity,+req.params.prodID,user);

    res.send(await addToCart())

   },

   deleteCartItems: async (req,res)=> {

    await deleteCart(+req.params.prodID);

    res.send(await getAllCarts())

   },

   updateCartItems: async (req,res)=> {

    let {quantity} = req.body

    const [user] = await getCart(+req.params.prodID);

    quantity? quantity : {quantity} = user

    await updateCart(quantity,+req.params.prodID);
    
    res.send(await getAllCarts())
   }
} 