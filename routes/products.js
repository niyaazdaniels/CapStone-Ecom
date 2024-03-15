import express from "express";
import controller from "../controller/products.js";

const router = express.Router();

router
    .route('/')  
        .get(controller.getManyProducts)  
        .post(controller.addOneProduct); 
       
router
    .route('/:prodID')
        .get(controller.getOneProduct)
        .patch(controller.editOneProduct) 
        .delete(controller.deleteOneProduct); 
    
export default router;