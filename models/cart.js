import { pool } from '../config/index.js'

const getCart = async (req, res) => {

    try {

      const result = await pool.query(

        `SELECT cart FROM Users 
        WHERE userID = ${req.params.id}`,

       [ req.params.id ]

      );
  
      const cart = result[0].cart;

      if (!cart) {

        return res.json({ msg: "Please Login" });

      }
  
      res.send(cart);

    } catch (error) {

      console.error("Error fetching cart:", error.message);

      res.status(500).json({ error: "Internal server error" });

    }
  };
  
  const addToCart = async (req, res) => {

    try {

      const results = await pool.query(

        `SELECT cart FROM users 
        WHERE userID = ${req.params.id}`,

        [req.params.id]

      );
  
      let cart = JSON.parse(results[0].cart || "[]");
  
      const id = req.body.id;

      const productResult = await pool.query(

        `SELECT * FROM Products
        WHERE prodID = ${id}`
      );
  
      const product = {

        id: productResult[0].id,

        prodName: productResult[0].prodName,

        prodImage: productResult[0].prodImage,

        prodDesc: productResult[0].prodDesc,

        category: productResult[0].category,

        price: productResult[0].price,

        quantity: productResult[0].quantity,

        userID: productResult[0].userID,

      };
  
      cart.push(product);
  
      await pool.query(

        `UPDATE Users SET cart = ? 
        WHERE userID = ${req.params.id}`,

        JSON.stringify(cart)

      );
  
      res.json({ product, msg: "Products added to Cart" });

    } catch (error) {

      console.error("Error adding to cart:", error.message);

      res.status(500).json({ error: "Internal server error" });

    }
  };
  
  const deleteFromCart = async (req, res) => {

    try {

      const results = await pool.query(

        `SELECT cart FROM Users 
        WHERE userID = ${req.params.id}`,

        [req.params.id]

      );
  
      const cart = JSON.parse(results[0].cart || "[]");

      const prodID = req.params.prodID;
  
      const updatedCart = cart.filter((product) => product.id != prodID);
  
      await pool.query(

        `UPDATE Users SET cart = ? 
        WHERE userID = ${req.params.id}`,

        JSON.stringify(updatedCart)

      );
  
      res.json({ msg: "Item Deleted from Cart" });

    } catch (error) {

      console.error("Error deleting from cart:", error.message);

      res.status(500).json({ error: "Internal server error" });

    }
  };
  
  export { getCart, addToCart, deleteFromCart };
  
  