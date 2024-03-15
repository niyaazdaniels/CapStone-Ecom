import { pool } from '../config/index.js';

const getExistingUsers = async () => {
    const [result] = await pool.query(`
        SELECT * 
        FROM Users`);
    return result;
};

const getExistingUser = async (userID) => {

    const [result] = await pool.query(`

        SELECT * 
        FROM Users
        WHERE userID = ?`, 

        [userID]);

    return result;
};

const getExistingUserEmailAdd = async (emailAdd) => { 

    const [result] = await pool.query(`

        SELECT * 
        FROM Users
        WHERE emailAdd = ?`, 

        [emailAdd]);

    return result;
};

const registerNewUser = async (firstName, lastName, gender, emailAdd, userPass, userImage, age) => {

    const [user] = await pool.query(`

        INSERT INTO Users (firstName, lastName, gender, emailAdd, userPass, userImage, age) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,

        [firstName, lastName, gender, emailAdd, userPass, userImage, age]);

    return getExistingUser(user.insertId);
};

const editExistingUser = async (firstName, lastName, gender, userRole, emailAdd, userPass, userImage, age, userID) => {

    const [user] = await pool.query(`

        UPDATE Users 
        SET firstName = ?, lastName = ?, gender = ?, userRole = ?, emailAdd = ?, userPass = ?, userImage = ?, age = ?
        WHERE userID = ?`,

        [firstName, lastName, gender, userRole, emailAdd, userPass, userImage, age, userID]);

    return getExistingUsers(user);
};

const deleteExistingUser = async (userID) => {

    const [user] = await pool.query(`

        DELETE FROM Users
        WHERE userID = ?`,

        [userID]);

    return getExistingUsers(user);
};

const verifyExistingUser = async (emailAdd) => {     

    try {

        const [[{ userPass }]] = await pool.query(`

            SELECT userPass FROM Users 
            WHERE emailAdd = ?`,

            [emailAdd]);

        return userPass;

    } catch (error) {

        throw new Error('User not found');

    }
};

export { getExistingUsers, getExistingUser, editExistingUser, deleteExistingUser, verifyExistingUser, registerNewUser, getExistingUserEmailAdd};