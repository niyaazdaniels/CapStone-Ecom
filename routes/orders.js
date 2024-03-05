import express from 'express';

import controller from '../controller/orders.js';

const router = express.Router();

router  
    .route('/')
    .get(controller.fetchAllOrders)
    .post(controller.addSingleOrder);

router
    .route('/:orderID') 
    .get(controller.fetchSingleOrder)
    .patch(controller.editSingleOrder)
    .delete(controller.deleteSingleOrder)

export default router;
