import express from 'express';
import controller from '../controller/cart.js'


const router = express.Router()


router.route('/:cartID')
         
.post(controller.additems)

    .get(controller.getitems) 
    
    .patch(controller.updateitems)
    
    .delete(controller.deleteitems)

    export default router  