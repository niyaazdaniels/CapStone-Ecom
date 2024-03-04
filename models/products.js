// Importing the database pool from the config file
import { pool } from '../config/index.js';

// Retrieve all products from the database
const getExistingProducts = async () => {
    const [result] = await pool.query(`
        SELECT * 
        FROM products`);
    return result;
};

// Retrieve a single product by prodID from the database
const getExistingProduct = async (prodID) => {
    const [result] = await pool.query(`
        SELECT * 
        FROM products
        WHERE prodID = ?`, [prodID]);
    return result;
};

// Add a new product to the database
const addNewProduct = async (prodName, prodDesc, quantity, price, category, prodImage) => {
    const [product] = await pool.query(`
        INSERT INTO products (prodName, prodDesc, quantity, price, category, prodImage) 
        VALUES (?, ?, ?, ?, ?)`,
        [prodName, prodDesc, quantity, price, category, prodImage]);
    return getExistingProduct(product.insertId);
};

// Edit an individual product in the database
const editExistingProduct = async (prodID, prodName, prodDesc, quantity, price, category, prodImage) => {
    await pool.query(`
        UPDATE products
        SET prodName = ?, prodDesc = ? ,quantity = ?, price = ? , category = ?, prodImage = ?
        WHERE prodID = ?`,
        [prodName, prodDesc, quantity, price, category, prodImage, prodID]);
    const editedProduct = await getExistingProduct(prodID);
    return editedProduct;
}; 

// Delete an individual product from the database
const removeExistingProduct = async (prodID) => {
    const [product] = await pool.query(`
        DELETE FROM products
        WHERE prodID = ?`,
        [prodID]);
    return getExistingProducts(product);
};

// Exporting functions to make them globally accessible
export { getExistingProducts, getExistingProduct, addNewProduct, editExistingProduct, removeExistingProduct };