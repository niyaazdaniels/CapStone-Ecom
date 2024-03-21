// import connection
import {pool} from "../config/index.js";

const addToCart = async (userID, prodID) => {

    const [cart] = await pool.query(`

        SELECT *

        FROM cart

        INNER JOIN Products ON cart.prodID = Products.prodID

        WHERE userID = ? AND Products.prodID = ?;

    `, 
    
    [userID, prodID]);

    return cart;
};

const insertCart = async (quantity, prodID, userID) => {

    const [user] = await pool.query(`
    
    SELECT * FROM Users 

    WHERE UserID = ?`,

     [userID]);

    const [product] = await pool.query(`

    SELECT * FROM Products

    WHERE prodID = {+req.params.prodID}`,

    [prodID])

    if (user.length === 0) {

        console.error(`User with ID ${userID} does not exist.`);

    }

    if (product.length === 0) {

        console.error(`Product with ID ${prodID} does not exist.`);

    }

    await pool.query(`
    
    INSERT INTO cart (quantity, prodID, userID)
    
    VALUES (?, ?, ?)`, 
    
    [quantity, prodID, userID]);

    return addToCart(quantity, prodID, userID);
};
 
 
const deleteCart = async(cartID)=> {

    const [cart] = await pool.query(` 

    DELETE FROM cart WHERE cartID = ?

    `,[cartID] 
    ) 
    return cart
}

const updateCart = async(quantity,cartID) => {

    const [cart]  = await pool.query(`

    UPDATE cart 

    SET quantity = ? 
    
    WHERE cartID = ?

    `,[quantity,cartID] 
    
    )
    return cart
}

const getCart = async(cartID) => {

  const [cart] = await pool.query(`
  
  SELECT * FROM

 cart 
 
 WHERE cartID = ?`, [cartID]);

  return cart
}

export {getCart, updateCart, deleteCart, insertCart, addToCart}