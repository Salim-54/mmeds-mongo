import express from 'express';
import { getAllBlogs, saveBlog, getBlogById, updateBlogById, deleteBlogById } from '../controllers/prescription.controller';
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

router.post('/', uploads.single("image"), saveBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.patch('/:id', updateBlogById);
router.delete('/:id', deleteBlogById);





export default router;