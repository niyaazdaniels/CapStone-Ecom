// import connection
import {pool} from "../config/index.js";

// get all items by user id
const getAllItems = async (userID,result) => {

    await pool.query(`

    SELECT * FROM cart 

    WHERE userID = ?`,

    [userID], 

    (err,results)=> {

        if (err){

            console.log(err);

            result(err,null);

        }else{

            result(null,results);

        }
    });
};

// get a items by user id, food id
const getAItem =  async (userID,prodID,result) => {

    await pool.query(`

    SELECT * FROM cart 

    WHERE userID = ? AND prodID = ?`,

    [userID, prodID], 

    (err,results)=> {

        if (err){

            console.log(err);

            result(err,null);

        }else{

            result(null,results);

        }
    });
};

// insert new item to cart
const insertToCart = async (data,result) => {

    await pool.query(`

    INSERT INTO cart SET ?`,

    data,

    (err,results)=> {

        if (err){

            console.log(err);

            result(err,null);

        }else{

            result(null,results[0]);

        }
    });
};

// update qty of a cart item
const updateCartItemQty = async (data,result) => {

    await pool.query(`

    UPDATE cart 

    SET quantity = ? 

    WHERE userID = ? AND prodID = ?`,

    [data.quantity, data.userID, data.prodID], 

    (err,results)=> {

        if (err){

            console.log(err);

            result(err,null);

        }else{

            result(null,results);

        }
    });
};


// delete cart item
const deleteItemInCart = async (userID,prodID,result) => {

    await pool.query
    (`

    DELETE FROM cart 

    WHERE userID = ? AND prodID = ?`,

    [userID,prodID], 

    (err,results)=> {

        if (err){

            console.log(err);

            result(err,null);

        }else{

            result(null,results);

        }
    });
};

// delete all Items
const deleteAllItemsByUser = async (userID,result) => {

    await pool.query(`

    DELETE FROM cart 

    WHERE userID = ?`,

    [userID], 

    (err,results)=> {

        if (err){

            console.log(err);

            result(err,null);

        }else{

            result(null,results);
        }
    });
};

export {getAItem, getAllItems, updateCartItemQty, deleteAllItemsByUser, deleteItemInCart, insertToCart}