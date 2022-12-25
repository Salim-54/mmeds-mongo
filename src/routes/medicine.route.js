import express from 'express';
import { saveMedicine, getAllMedicines, createMedicine } from '../controllers/medicine.controller'
import authenticated from '../middleware/protection';


const router = express.Router();

router.post('/:id', saveMedicine);
router.get('/', getAllMedicines);
router.post('/', createMedicine);

export default router;