import express from 'express';
import { handlePayment } from '../controllers/opay.controller'
import authenticated from '../middleware/protection';


const router = express.Router();

router.post('/', handlePayment);


export default router;