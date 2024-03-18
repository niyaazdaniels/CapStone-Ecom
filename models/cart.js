// import connection
import {pool} from "../config/index.js";

const getCart = async () => {

    const [cart] = await pool.query(`

        SELECT * FROM 
        cart
    `)
    return cart
}

const addToCart = async (prodID, userID) => {

    const [existingProduct] = await pool.query(`

        SELECT * FROM cart

        WHERE prodID = ? AND userID = ?

    `, [prodID, userID]);

    if (existingProduct.length > 0) {

        const updatedQuantity = existingProduct[0].quantity + 1;

        await pool.query(`

            UPDATE cart

            SET quantity = ?

            WHERE prodID = ? AND userID = ?

        `, [updatedQuantity, prodID, userID]);


    } else {

        await pool.query(`

            INSERT INTO cart (prodID, userID, quantity)

            VALUES (?, ?, 1)

        `, [prodID, userID]);

    }
}

const insert = async(prodID, userID) => {

    await addToCart(prodID, userID);
}

const removeFromCart = async (prodID) => {

    const [inCart] = await pool.query(`

    DELETE FROM cart 

    WHERE prodID = ? 

    `, [prodID]);
}


export {getCart, removeFromCart, insert, addToCart}