import express from 'express';
import { saveMedicine, getAllMedicines } from '../controllers/medicine.controller'


const router = express.Router();

router.post('/:id', saveMedicine);
router.get('/', getAllMedicines);

export default router;