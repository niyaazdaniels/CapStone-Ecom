// import connection
import {pool} from "../config/index.js";

const getAllCarts = async(userID)=> {

    const [carts] = await pool.query(`

    SELECT DISTINCT prodName , price , prodImage , category, count(cartID) as quantity 

    FROM cart 

    INNER JOIN Products

    ON cartID = prodID
    
    WHERE userID = ? GROUP BY prodName;

    `,[userID])

    return carts
}

const addToCart = async (userID, prodID) => {

    const [cart] = await pool.query(`

        SELECT *
        
        FROM cart
        
        INNER JOIN Products 
        
        ON cartID = prodID

        WHERE userID = ? AND prodID = ?;

    `, [userID, prodID]);

    return cart;
};

const insertCart = async (quantity, prodID, userID) => {
    
    const [user] = await pool.query(`

    SELECT * FROM users 

    WHERE userID = ?`, 

    [userID]);

    const [product] = await pool.query(`
        
        SELECT * FROM 

        Products 

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

    INSERT INTO cart (quantity, prodID, userID) 

    VALUES (?, ?, ?)`,

     [quantity, prodID, userID]);

    return addToCart(quantity, prodID, userID);
};

 
const deleteCart = async(cartID)=> {

    const [cart] = await pool.query(`

    DELETE FROM cart 

    WHERE cartID =?

    `,[cartID]) 

    return cart
}

const updateCart = async(quantity,cartID) => {

    const [cart]  = await pool.query(`

    UPDATE cart SET quantity =? 
    WHERE cartID =?

    `,[quantity,cartID] 
    )

    return cart
}

const getCart = async(cartID) => {

  const [cart] = await pool.query(`

  SELECT * FROM cart 

  WHERE cartID =?`,

   [cartID]);

  return cart
}

export {getCart, deleteCart, insertCart, addToCart, getAllCarts, updateCart}