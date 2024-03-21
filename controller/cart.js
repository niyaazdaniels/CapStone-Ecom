import {addToCart,deleteCart,updateCart,getCart,insertCart} from "../models/cart.js";

export default {

   getitems: async (req,res)=> {

    res.send(await getCart(+req.params.prodID))

   },

   additems: async (req,res)=>{

    const {  quantity } = req.body;

    const { user } = req.query

    await insertCart(quantity,+req.params.prodID,user);

    res.send(await addToCart())

   },

   deleteitems: async (req,res)=> {

    await deleteCart(+req.params.prodID);

    res.send(await getCart())

   },

   updateitems: async (req,res)=> {

    let {quantity} = req.body

    const [user] = await getCart(+req.params.prodID);

    quantity? quantity : {quantity} = user

    await updateCart(quantity,+req.params.prodID);

    res.send(await getCart())
    
   }
} 