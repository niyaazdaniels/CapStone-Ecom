import { addToCart , deleteCart , updateCart , getCart , insertCart } from "../models/cart.js"

export default {

   getCart : async (req, res) => {

      res.send(await getCart())

  },
  addToCart : async (req, res) => {

      console.log(req.query);

      console.log(+req.params.prodID);

      let { quantity } = req.body

      let { userID } = req.query

      await insertCart(+req.params.prodID, userID, quantity)

      res.send(await getCart())

  },
  deleteFromCart : async (req, res) => {

      await deleteCart(+req.params.proID)

      res.send(await getCart())
  },
   updateCartItems: async (req,res)=> {

    let {quantity} = req.body

    const [user] = await getCart(+req.params.prodID);

    quantity? quantity : {quantity} = user

    await updateCart(quantity,+req.params.prodID);

    res.send(await getCart())
    
   }
} 