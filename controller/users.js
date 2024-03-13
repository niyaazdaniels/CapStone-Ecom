// Importing necessary functions for user management from the users model
import { getExistingUsers, getExistingUser, editExistingUser, deleteExistingUser, verifyExistingUser, registerNewUser, getSingleUser } from '../models/users.js';
// Importing bcrypt for password hashing
import bcrypt from 'bcrypt';

// Exporting the user controller object
export default {
    // Controller to fetch all users from the database
    getManyUsers: async (req, res) => {
        try {
            // Retrieve all users from the database
            const users = await getExistingUsers();
            // Check if users exist
            if (!users) {
                throw new Error("No users found!");
            }
            // Send the users as response
            res.send(users);
        } catch (error) {
            // Handle errors
            console.error("Error in fetching all the users:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },
    // Controller to add a single user to the database
registerOneUser: async (req, res) => {
    try {
        // Extract user details from the request body
        const { firstName, lastName, gender, emailAdd, userPass, userImage, age } = req.body;
        // Hash the password using bcrypt
        const hash = await bcrypt.hash(userPass, 10);
        // Add user with hashed password to the database
        await registerNewUser(firstName, lastName, gender, emailAdd, hash, userImage, age);
        // Send success response
        res.send('User has been registered successfully!');
    } catch (error) {
        // Handle errors
        res.status(500).send('Error adding user: ' + error);
    }
},
    // Controller to fetch a single user from the database
    getOneUser: async (req, res) => {
        try {
            const userId = req.params.emailAdd;
            const user = await getExistingUser(userId);
            if (user) {
                res.send(user);
            } else {
                res.status(404).send({ error: "User not found" });
            }
        } catch (error) {
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    // Controller to edit an existing user in the database
    editOneUser: async (req, res) => {
        try {
            const [user] = await getExistingUser(+req.params.userID);
            let { firstName, lastName, gender, userRole, emailAdd, userPass, userImage, age } = req.body;
            
            firstName = firstName || user.firstName;
            lastName = lastName || user.lastName;
            gender = gender || user.gender;
            userRole = userRole || user.userRole;
            emailAdd = emailAdd || user.emailAdd;
            userPass = userPass || user.userPass;
            userImage = userImage || user.userImage;
            age = age || user.age;
            
            // Update user in the database
            await editExistingUser(firstName, lastName, gender, userRole, emailAdd, userPass, userImage, age, +req.params.userID);
            
            const updatedUser = await getExistingUsers();

            // Send updated list of users as response
            res.json(updatedUser);
        } catch (error) {
            // Handle errors
            res.status(500).json({ error: 'An error occurred while editing the user.' });
        }
    },

    // Controller to delete a single user from the database
    deleteOneUser: async (req, res) => {
        try {
            // Extract user ID from request parameters
            const userId = +req.params.userID;
            // Delete user from the database
            const deletedUser = await deleteExistingUser(userId);
            // Check if user was successfully deleted
            if (deletedUser) {
                // Send success message
                res.send({ message: "User deleted successfully" });
            } else {
                // Handle case where user is not found
                res.status(404).send({ error: "User not found" });
            }
        } catch (error) {
            // Handle errors
            res.status(500).send({ error: "Internal Server Error" });
        }
    },
    // Controller to login a user by comparing passwords
    logInUser: async (req, res, next) => {
        try {
            const [user] = req.body.emailAdd;
            const { emailAdd, userPass } = req.body;
            const hashedPassword = await verifyExistingUser(emailAdd);
            const result = await bcrypt.compare(userPass, hashedPassword);
            if (result === true) {
                let currentUser = await getSingleUser(userRole)
                res.send({
                    msg:  `Welcome back ${emailAdd}!`,
                    token: req.token,
                    user: currentUser,
                });
            } else {
                res.status(401).send({ msg: "Password does not match, please try again." });
            }
        } catch (error) {
            console.error('Error logging in user: ', error);
            res.status(500).send('Error logging in user.');
        }
    }    
}