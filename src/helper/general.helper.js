import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";


const handleGetAll = expressAsyncHandler(async(Model) => {
    const items = await Model.find({}).sort({
        createdAt: -1,
    });
    return await items ? items : " Internal server error";
});

const handleCreate = expressAsyncHandler(async(Model, data, res) => {
    if (!Object.keys(data).length)
        return res
            .status(400)
            .json({ status: "Fail", message: "please provide required information" });
    const body = await Model.create(data);

    return body;
});

const handleCreateUser = expressAsyncHandler(async(Model, data, res) => {

    if (!Object.keys(data).length)
        return res
            .status(400)
            .json({ status: "Fail", message: "please provide required information" });
    const registeredUser = await Model.create(data);

    return (registeredUser) ? registeredUser : "Internal server error";

});

const handleGetSingle = expressAsyncHandler(async(Model, itemId) => {
    return await Model.findById(itemId, { password: 0 }, (error, result) => {
        if (error) {
            return null
        }
        return result
    }).clone().catch((err) => { console.log(err) })
});

const handleEdit = expressAsyncHandler(
    async(Model, itemId, data, res, responseMessage) => {
        // const { id } = req.params;

        const itemExist = await Model.findById({ _id: itemId });
        if (!itemExist)
            return res.status(404).json({ status: "Fail", message: responseMessage });
        const updatedItem = await Model.findByIdAndUpdate(itemId, data, {
            new: true,
        });

        return res.status(200).json({ status: "Success", updatedItem });
    }
);

const handleDelete = async(Model, id) => {
    return await Model.deleteOne({ _id: id });
};

const handleUpdate = expressAsyncHandler(async(model, itemId, newData, res) => {
    // const id = req.params.id;

    const dbItem = await model.findById(itemId);
    if (!dbItem)
        return res.status(404).json({ message: "ooops! we can't find what you are looking for!" });

    try {
        const updateItem = await model.findByIdAndUpdate(itemId, newData, {
            new: true,
        });
        return updateItem;
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Internal server error!" });
    }
})

// Not authorized
const notAuthorized = (res) => {
    res.status(401).json({ message: 'Not authorized!' })
}

const userToken = (req, res) => {
    const headerAuth = req.headers.authorization;
    if (!headerAuth) res.status(404).json({ message: "Not authorized!" });
    const token = headerAuth.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    return decodedToken;
}

const GeneratePatientId = async(Model) => {
    const data = await Model.find({});
    const dataLength = data.length;
    return Math.floor(Math.random() * (10000 - 10) + 10);
}

export {
    handleGetAll,
    handleCreate,
    handleGetSingle,
    handleEdit,
    handleDelete,
    handleCreateUser,
    notAuthorized,
    userToken,
    GeneratePatientId,
    handleUpdate
};