// Importing the database pool from the config file
import { pool } from '../config/index.js';

// Retrieve all users from the database
const getExistingUsers = async () => {
    const [result] = await pool.query(`
        SELECT * 
        FROM Users`);
    return result;
};

// Retrieve a single user by userID from the database
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

// Add a new user to the database
const registerNewUser = async (firstName, lastName, gender, emailAdd, userPass, userImage, age) => {
    const [user] = await pool.query(`
        INSERT INTO Users (firstName, lastName, gender, emailAdd, userPass, userImage, age) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, gender, emailAdd, userPass, userImage, age]);
    return getExistingUser(user.insertId);
};

// Edit an individual user in the database
const editExistingUser = async (firstName, lastName, gender, userRole, emailAdd, userPass, userImage, age, userID) => {
    const [user] = await pool.query(`
        UPDATE Users 
        SET firstName = ?, lastName = ?, gender = ?, userRole = ?, emailAdd = ?, userPass = ?, userImage = ?, age = ?
        WHERE userID = ?`,
        [firstName, lastName, gender, userRole, emailAdd, userPass, userImage, age, userID]);
    return getExistingUsers(user);
};

// Delete an individual user from the database
const deleteExistingUser = async (userID) => {
    const [user] = await pool.query(`
        DELETE FROM Users
        WHERE userID = ?`,
        [userID]);
    return getExistingUsers(user);
};

// Verify a user on login by retrieving their password from the database
const verifyExistingUser = async (emailAdd) => {     
    try {
        const [[{ userPass }]] = await pool.query(`
            SELECT userPass FROM Users WHERE emailAdd = ?`,
            [emailAdd]);
        return userPass;
    } catch (error) {
        // Handle errors, e.g., user not found
        throw new Error('User not found');
    }
};


// Exporting functions to make them globally accessible
export { getExistingUsers, getExistingUser, editExistingUser, deleteExistingUser, verifyExistingUser, registerNewUser, getExistingUserEmailAdd};