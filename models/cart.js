import { pool } from '../config/index.js'

// Get Cart
const getCart = async () => {
    const [cart] = await pool.query(`
        SELECT * FROM cart
    `)
    return cart
}
// Add to Cart
const addToCart = async (prodID, userID) => {
    // Check if the product is already in the cart
    const [existingProduct] = await pool.query(`
        SELECT * FROM cart
        WHERE prodID = ? AND userID = ?
    `, [prodID, userID]);

    if (existingProduct.length > 0) {
        // Update the quantity of the existing product in the cart
        const updatedQuantity = existingProduct[0].quantity + 1;
        await pool.query(`
            UPDATE cart
            SET quantity = ?
            WHERE prodID = ? AND userID = ?
        `, [updatedQuantity, prodID, userID]);

    } else {
        // Insert the product into the cart
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
    DELETE FROM cart WHERE prodID = ? 
    `, [prodID]);
}

export { getCart, insert, addToCart, removeFromCart,}