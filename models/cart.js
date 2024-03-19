// import connection
import {pool} from "../config/index.js";

const getAllCarts = async(userID)=> {

    const [carts] = await pool.query(`

    SELECT prodName , price , prodImage , category , COUNT(cartID) as quantity 

    FROM cart 

    INNER JOIN Products ON cart.prodID = Products.prodID 

    WHERE cart.userID = ?

    GROUP BY prodName;

    `,
    
    [userID])

    return carts
}

const addToCart = async (userID, prodID) => {

    const [cart] = await pool.query(`

    SELECT DISTINCT cart.userID , cart.cartID , cart.prodID , Products.prodName , Products.category , Products.prodImage, Products.price , Users.emailAdd

    FROM cart

    JOIN Products ON cart.prodID = Products.prodID

    JOIN Users ON cart.userID = Users.userID

    WHERE cart.userID = ?;
    
    `,
    
    [userID, prodID]);

    return cart;

}; 


const insertCart = async (userID, prodID, quantity) => {

    await pool.query(`

    INSERT INTO cart (userID, prodID, quantity) 

    VALUES (?, ?, ?)`,

     [userID, prodID, quantity]);

    return addToCart(userID, prodID, quantity);
}; 

 
const deleteCart = async(cartID)=> {

    const [cart] = await pool.query(`

    DELETE FROM cart 

    WHERE cartID =?

    `,
    
    [cartID]) 

    return cart
}

const updateCart = async(quantity , cartID) => {

    const [cart]  = await pool.query(`

    UPDATE cart 
    
    SET quantity = ? 

    WHERE cartID = ?

    `,
    
    [quantity , cartID])

    return cart
}

const getCart = async(cartID) => {

  const [cart] = await pool.query(`

  SELECT * FROM cart 

  WHERE cartID = ?`,

   [cartID]);

  return cart
}

export {getCart, deleteCart, insertCart, addToCart, getAllCarts, updateCart}