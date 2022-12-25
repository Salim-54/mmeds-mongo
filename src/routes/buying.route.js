import express from 'express';
import { startMedTransaction } from '../controllers/med_transaction.controller'
import authenticated from '../middleware/protection';


const router = express.Router();

router.post('/:id', authenticated, startMedTransaction);


export default router;