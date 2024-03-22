import {addToCart,deleteCart,updateCart,getCart,insertCart, getManyCarts} from "../models/cart.js";

export default {

   getItemsFromCart: async (req,res)=> {

    res.send(await getManyCarts(+req.params.prodID))

   },

   addItemsToCart: async (req,res)=>{

    const { quantity } = req.body;

    const { user } = req.query 

    await insertCart(user, +req.params.prodID, quantity);

    res.send(await addToCart())  
 
   },

   deleteItemsInCart: async (req,res)=> {

    await deleteCart(+req.body.userID, +req.params.prodID);

    res.send(await getManyCarts())
 
   }, 

   deleteCart: async (req,res)=> {

    await deleteCart(+req.params.prodID);

    res.send(await getManyCarts())
 
   }, 

   updateItemInCart: async (req,res)=> {

    let {quantity} = req.body 

    const [user] = await getManyCarts(+req.params.prodID);

    quantity? quantity : {quantity} = user

    await updateCart(quantity,+req.params.prodID); 
 
    res.send(await getManyCarts())
    
   } 
} 