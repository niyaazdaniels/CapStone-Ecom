import { pool } from '../config/index.js';

const getExistingProducts = async () => {
    
    const [result] = await pool.query(`

        SELECT * 
        FROM Products`);

    return result;

};

const getExistingProduct = async (prodID) => {

    const [result] = await pool.query(`

        SELECT * 
        FROM Products
        WHERE prodID = ?`, 

        [prodID]);

    return result;
};

const addNewProduct = async (prodName, prodDesc,quantity, price, category, prodImage) => {

    const [product] = await pool.query(`

        INSERT INTO Products (prodName, prodDesc, quantity, price, category, prodImage) 
        VALUES (?, ?, ?, ?, ?, ?)`,

        [prodName, prodDesc ,quantity, price, category, prodImage ]);

    return getExistingProduct(product.insertId);
};

const editExistingProduct = async (prodID,prodName, prodDesc, quantity, price, category, prodImage) => {

    await pool.query(`

        UPDATE Products
        SET prodName = ?, prodDesc = ? , quantity = ?, price = ? , category = ?, prodImage = ?
        WHERE prodID = ?`,

        [(prodName, prodDesc, quantity, price,category, prodImage) ]);

    const editedProduct = await getExistingProduct(prodID);

    return editedProduct;
}; 

const removeExistingProduct = async (prodID) => {

    const [product] = await pool.query(`

        DELETE FROM Products
        WHERE prodID = ?`,

        [prodID]);

    return getExistingProducts(product);
};

export { getExistingProducts, getExistingProduct, addNewProduct, editExistingProduct, removeExistingProduct };