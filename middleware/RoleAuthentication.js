import { checkUserRole } from "../models/users.js";

const adminRole = async (req, res, next) => {
    const { firstName, lastName, gender, userRole, emailAdd, userPass, userImage, age } = req.body;
    const role = await checkUserRole(userRole);
    if(role === 'Admin'){
        next();
    } else {
        res.sendStatus(403);
    }
} 

export default adminRole;