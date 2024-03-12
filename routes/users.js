// Importing the Express module from the installed express package
import express from "express";
// Importing functions from the users controller
import controller from "../controller/users.js";
import adminRole from "../middleware/RoleAuthentication.js"

// Creating an instance of the Express Router
const router = express.Router();

// Grouping together routes with similar paths
router
    .route('/')
        .get(adminRole.adcontroller.getManyUsers) // GET request to fetch many users
        .post(adminRole.controller.registerOneUser); // POST request to add a new user

router
    .route('/:userID')
        .get(adminRole.controller.getOneUser) // GET request to fetch a single user by ID
        .patch(adminRole.controller.editOneUser) // PATCH request to edit a user by ID
        .delete(adminRole.controller.deleteOneUser); // DELETE request to delete a user by ID

// Exporting the router to be used globally
export default router;