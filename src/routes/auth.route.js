import express from 'express';
import { signup, signIn } from '../controllers/auth.controller';


const router = express.Router();

router.post('/', signup);
router.post('/', signIn);

export default router;