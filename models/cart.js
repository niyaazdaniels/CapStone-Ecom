// import connection
import {pool} from "../config/index.js";

const getManyCarts = async(userID)=> {

    const [carts] = await pool.query(`

    SELECT distinct cartID, prodName , price , prodImage , category , count(cartID) as quantity, SUM(price) AS totalAmount  

    FROM cart INNER JOIN Products ON cart.prodID = Products.prodID

    WHERE cart.userID = ? GROUP BY prodName;

    `,[userID])

    return carts
}

const addToCart = async (userID, prodID) => {

    const [cart] = await pool.query(`

        SELECT *

        FROM cart

        INNER JOIN Products ON cart.prodID = Products.prodID

        WHERE cart.userID = ? AND Products.prodID = ?;

    `, [userID, prodID]);

    return cart;
};

const insertCart = async (userID, prodID, quantity) => {

    const [user] = await pool.query(`
    
    SELECT * FROM Users
    
    WHERE userID = ?`, 
    
    [userID]);

    const [product] = await pool.query(`
    
    SELECT * FROM Products 
    
    WHERE prodID = ?`,
    
    [prodID])

    if (user.length === 0) {

        console.error(`User with ID ${userID} does not exist.`);

        return null; 
    }

    if (product.length === 0) {

        console.error(`Product with ID ${prodID} does not exist.`);

        return null; 
    }

    await pool.query(`
    
    INSERT INTO cart (userID, prodID, quantity) 
    
    VALUES (?, ?, ?)`,
    
    [userID, prodID, quantity]);

    return addToCart(userID, prodID, quantity);
};


const updateCart = async(quantity,cartID) => {

    const [cart]  = await pool.query(`

    UPDATE cart 
    
    SET quantity = ?
    
    WHERE cartID =?

    `,[quantity,cartID] 

    )
    return cart
}

const getCart = async(cartID) => {

  const [cart] = await pool.query(`
  
  SELECT * FROM 
  
  cart 
  
  WHERE cartID =?`, 
  
  [cartID]);

  return cart
}

const dropCart = async (prodID) => {

    try {

        const query = `
        
        DROP cart

        wHERE userID = ?

        `;

        const [result] = await pool.query (query, [prodID])
        
        return result

    } catch (error) {

        console.error ("Error deleting cart:", error);

        throw error;
    }
}

const deleteCart = async (prodID,userID) => {

    try {

        const query = `

        DELETE FROM cart WHERE prodID = ? 
        AND userID = ?

        `;
        
        const [result] = await pool.query(query, [prodID,userID]);

        return result;

    } catch (error) {

        console.error("Error deleting item from cart:", error);

        throw error;
    }
};



export {getManyCarts, getCart, updateCart, deleteCart, insertCart, addToCart, dropCart}