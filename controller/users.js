// Importing necessary functions for user management from the users model
import { getExistingUsers, getExistingUser, addNewUser, editExistingUser, deleteExistingUser, verifyExistingUser, registerNewUser } from '../models/users.js';
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
addOneUser: async (req, res) => {
    try {
        // Extract user details from the request body
        const { firstName, lastName, userRole, emailAdd, userPass, userImage } = req.body;
        // Hash the password using bcrypt
        const hash = await bcrypt.hash(userPass, 10);
        // Add user with hashed password to the database
        await addNewUser(firstName, lastName, userRole, emailAdd, hash, userImage);
        // Send success response
        res.send('User has been added successfully');
    } catch (error) {
        // Handle errors
        res.status(500).send('Error adding user: ' + error);
    }
},
    // Controller to add a single user to the database
    registerOneUser: async (req, res) => {
        try {
            const post = await registerNewUser(emailAdd, userPass)
            // Extract user details from the request body
            const { emailAdd, userPass } = req.body;
            // Hash the password using bcrypt
            bcrypt.hash(userPass, 10, async (err, hash) => {
                if (err) throw err;
                // Add user with hashed password to the database
                await registerNewUser(emailAdd, hash);
            });
            // Send success response
            res.send('User has been registered successfully');
        } catch (error) { 
            // Handle errors
            res.status(500).send('Error registering user: ' + error);
            res.send(await registerNewUser())
        }
    },
    // Controller to fetch a single user from the database
    getOneUser: async (req, res) => {
        try {
            // Extract user ID from request parameters
            const userId = +req.params.userID;
            // Retrieve user details from the database
            const user = await getExistingUser(userId);
            // Check if user exists
            if (user) {
                // Send user details as response
                res.send(user);
            } else {
                // Handle case where user is not found
                res.status(404).send({ error: "User not found" });
            }
        } catch (error) {
            // Handle errors
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    // Controller to edit an existing user in the database
    editOneUser: async (req, res) => {
        try {
            // Retrieve user details and ID from request parameters
            const [user] = await getExistingUser(+req.params.userID);
            let { firstName, lastName, userRole, emailAdd, userPass, userImage } = req.body;
            
            // Update user details if provided, otherwise keep the existing details
            firstName = firstName || user.firstName;
            lastName = lastName || user.lastName;
            userRole = userRole || user.userRole;
            emailAdd = emailAdd || user.emailAdd;
            userPass = userPass || user.userPass;
            userImage = userImage || user.userImage;
            
            // Update user in the database
            await editExistingUser(firstName, lastName, userRole, emailAdd, userPass, userImage, +req.params.userID);
            
            // Send updated list of users as response
            res.json(await getExistingUser());
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
            // Extract email and password from request body
            const { emailAdd, userPass } = req.body;
            // Retrieve hashed password for the provided email
            const hashedPassword = await verifyExistingUser(emailAdd);
            // Compare provided password with hashed password
            const result = await bcrypt.compare(userPass, hashedPassword);
            // If passwords match, proceed to the next middleware
            if (result === true) {
                res.send({
                    msg:  `Welcome back ${emailAdd}!`
                })
            } else {
                // If passwords do not match, send error response
                res.status(401).send({ msg: "Password does not match, please try again." });
            }
        } catch (error) {
            // Handle errors
            res.status(500).send('Error logging in user: ' + error);
        }
    }
    
}