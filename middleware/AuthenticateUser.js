import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { verifyExistingUser } from '../models/users.js';
config();

// const verifyToken = async (req,res,next)=>{
//     const {emailAdd,userPass} = req.body
//     const hashedPassword = await verifyExistingUser(emailAdd)
//     bcrypt.compare(userPass,hashedPassword,(err,result)=>{
//         if(err) throw err
//         if(result === true){
//             console.log(emailAdd)
//             const token = jwt.sign({emailAdd:emailAdd},process.env.SECRET_KEY,{expiresIn:'1h'})
//             res.send({
//                 token:token,
//                 msg:'You have login succesfully'
//             })
//             next()
//         } else{
//             res.json({msg:'Password or Email address doesnt match'})
//         }
//     })
// }
// const createToken = async (req, res, next) => {
//     try {
//         const { emailAdd, userPass } = req.body;
//         const hashedUserPass = await verifyExistingUser(emailAdd);

//         if (!hashedUserPass) {
//             console.log("User not found");
//             return res.status(401).send({ msg: "User not found" });
//         }
//         const result = await bcrypt.compare(userPass, hashedUserPass);
//         if (result === true) {
//             console.log("Password matched. Creating token...");
//             const token = jwt.sign({ emailAdd: emailAdd }, process.env.SECRET_KEY, { expiresIn: '1h' });
//             res.cookie('jwt', token, { httpOnly: false });
//             console.log("Token created successfully");
//             next(); 
//         } else {
//             console.log("Password does not match");
//             return res.status(401).send({ msg: "The username or password does not match" });
//         }
//     } catch (error) {
//         console.error("Error logging in:", error);
//         return res.status(500).send('Error logging in: ' + error);
//     }
// };

const verifyToken = async (req, res, next) => {
    try {
        const { emailAdd, userPass } = req.body;
        const hashedPassword = await verifyExistingUser(emailAdd);
        bcrypt.compare(userPass, hashedPassword, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            if (result === true) {
                req.tokenData = { emailAdd: emailAdd };
                next(); // Move to the next middleware
            } else {
                res.status(401).json({ msg: 'Password or Email address does not match' });
            }
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).send('Internal Server Error');
    }
};

const createToken = async (req, res, next) => {
    try {
        const { emailAdd, userPass } = req.body;
        const hashedUserPass = await verifyExistingUser(emailAdd);

        if (!hashedUserPass) {
            console.log("User not found");
            return res.status(401).send({ msg: "User not found" });
        }
        const result = await bcrypt.compare(userPass, hashedUserPass);
        if (result === true) {
            console.log("Password matched. Creating token...");
            const token = jwt.sign({ emailAdd: emailAdd }, process.env.SECRET_KEY, { expiresIn: '1h' });
            
            // Set cookie
            res.cookie('jwt', token, { httpOnly: false}); // 1 hour expiration
            
            console.log("Token created successfully");
            console.log(token);
            req.token = token; // Store token in request object
            next(); // Move to the next middleware
        } else {
            console.log("Password does not match");
            return res.status(401).send({ msg: "The username or password does not match" });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).send('Internal Server Error');
    }
};




export { verifyToken, createToken };