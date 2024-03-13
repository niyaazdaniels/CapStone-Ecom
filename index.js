// Importing required modules and packages
import express from "express";
import { config } from "dotenv";
import cors from 'cors';
import productsRouter from "./routes/products.js";
import usersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
import signUpRouter from "./routes/signup.js";
import cartRouter from "./routes/cart.js";
import cookieParser from 'cookie-parser';
import { verifyToken, createToken } from "./middleware/AuthenticateUser.js";

config();

// Set the port for the server to listen on
const PORT = process.env.PORT || 7070;

// Create an instance of Express application
const app = express();
// Middleware for enabling CORS
app.use(cors({
    origin: "http://localhost:8080",
    credentials: true 
  }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('static'));

// Routes 
app.use('/products', productsRouter); 
app.use('/users', usersRouter);
app.use('/login', createToken, loginRouter); 
app.use('/signup', signUpRouter); 
app.use('/cart', cartRouter);
// Middleware for parsing cookies
 
// Start the server and listen on the defined port
app.listen(PORT, () => console.log(`Server Live on PORT http://localhost:${PORT}`));