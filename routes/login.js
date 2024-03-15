// Importing the Express module from the installed express package
import express from "express";
import controller from "../controller/users.js";
import { verifyToken } from "../middleware/AuthenticateUser.js";

// Creating an instance of the Express Router
const router = express.Router();
router  
    .route('/', verifyToken)
    .post(controller.logInUser); 

// Exporting the router to be used globally
export default router;  