import express from 'express';
import {
    httpRegisterUser,
    httpGetAllUsers,
    httpGetUser,
    httpDeleteUser,
    httpLoginUser,
} from '../controllers/auth.controller';


const router = express.Router();

router.post('/signup', httpRegisterUser);
router.post('/signIn', httpLoginUser);
router.get('/', httpGetAllUsers);
router.get('/:id', httpGetUser);
router.delete('/:id', httpDeleteUser);

export default router;