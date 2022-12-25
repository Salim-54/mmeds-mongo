import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

const authenticated = expressAsyncHandler(async(req, res, next) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader) return res.status(401).json({ message: 'Access Denied!' });
    const token = authHeader.replace("Bearer ", "");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
        next()
    } catch (error) {
        res.status(400).json({ message: "Not authorized!" });
    }

})

export default authenticated;