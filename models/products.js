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

const addNewProduct = async (prodName, prodDesc, category, price, quantity, prodImage) => {

    const [product] = await pool.query(`

        INSERT INTO Products (prodName, prodDesc, category, price, quantity, prodImage) 
        VALUES (?, ?, ?, ?, ?, ?)`,

        [prodName, prodDesc , category, price, quantity, prodImage ]);

    return getExistingProduct(product.insertId);
};

const editExistingProduct = async (prodID, prodName, prodDesc, category, price, quantity, prodImage) => {

    await pool.query(`

        UPDATE Products

        SET prodName = ?, prodDesc = ?, category = ?, price = ?, quantity = ?, prodImage = ?

        WHERE prodID = ?`,
        
        [prodName, prodDesc, category, price, quantity, prodImage, prodID]
    );

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