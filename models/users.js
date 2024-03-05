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
        WHERE userID = ?`, [userID]);
    return result;
};
// Add a new user to the database
const registerNewUser = async (firstName, lastName, userRole, emailAdd, userPass, userImage, gender, age) => {
    const [user] = await pool.query(`
        INSERT INTO Users (firstName, lastName, userRole, emailAdd, userPass, userImage, gender, age) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [firstName, lastName, userRole, emailAdd, userPass, userImage, gender, age]);
    return getExistingUser(user.insertId);
};
// Edit an individual user in the database
const editExistingUser = async (firstName, lastName, userRole, emailAdd, userPass, userImage, gender, age, userID) => {
    const [user] = await pool.query(`
        UPDATE Users 
        SET firstName = ?, lastName = ?, userRole = ?, emailAdd = ?, userPass = ?, userImage = ?, gender = ?, age = ?
        WHERE userID = ?`,
        [firstName, lastName, userRole, emailAdd, userPass, userImage, gender, age, userID]);
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
// const registerNewUser = async (emailAdd, userPass) => {
//     await pool.query(`
//     INSERT INTO Users (emailAdd, userPass) 
//     VALUES (?, ?)
//     `,[emailAdd, userPass])
// }

// Exporting functions to make them globally accessible
export { getExistingUsers, getExistingUser, editExistingUser, deleteExistingUser, verifyExistingUser, registerNewUser };