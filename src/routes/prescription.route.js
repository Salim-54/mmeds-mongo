import express from 'express';
import { getAllPrescriptions, savePrescription, getPrescriptionById, updatePrescriptionsById, deletePrescriptionById, getPrescriptionByToken } from '../controllers/prescription.controller';
import multer from 'multer';


const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("invalid image file!", false);
    }
};
const uploads = multer({ storage, fileFilter });




const router = express.Router();

router.post('/', uploads.single("image"), savePrescription);
router.get('/all', getAllPrescriptions);
router.get('/:id', getPrescriptionById);
router.patch('/:id', updatePrescriptionsById);
router.delete('/:id', deletePrescriptionById);
router.get("/", getPrescriptionByToken);





export default router;