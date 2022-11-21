import Blog from '../database/model/prescription.model';
import AppError from '../utils/appError';
import fileUpload from '../utils/fileUpload';

// import errorController from './error.controller';
import catchAsync from '../utils/catchAsync'


exports.saveBlog = catchAsync(async(req, res, next) => {

    let blog = (req.body)


    // let hasBlog = await Blog.findOne({ title: req.body.title });
    // if (hasBlog) {
    //     return res.status(400).json({ error: true, message: "There is already a blog like this!!" });
    // }


    if (req.file) {
        req.body.image = await fileUpload(req);
    } else {
        req.body.image =
            "https://res.cloudinary.com/salim-atlp-brand/image/upload/v1647272711/article_vmtmzu.png";
    }

    let newBlog = await new Blog(blog);
    newBlog.save();


    res.status(201).json({
        status: 'success',
        data: {
            blog: newBlog
        }
    });
});


exports.getAllBlogs = async(req, res) => {
    const blogs = await Blog.find();
    res.status(200).json({
        status: 'success',
        results: blogs.length,
        data: blogs
    });
};





exports.getBlogById = catchAsync(async(req, res, next) => {
    const blog = await Blog.findById(req.params.id).populate("medicines");

    if (!blog) {
        return next(new AppError('No blog found with that ID', 404));
    }


    res.status(200).json({
        status: 'success',
        data: blog
    });
});



exports.updateBlogById = async(req, res) => {
    try {

        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                blog
            }
        });
        // if(!blog) return res.status(404).json({success: false, message: "Blog not found"}) ;
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }

};

exports.deleteBlogById = async(req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: `blog with id: ${req.params.id} is deleted successfully!!`
        });
        // if(!blog) return res.status(404).json({success: false, message: "Blog not found"}) ;
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }

}