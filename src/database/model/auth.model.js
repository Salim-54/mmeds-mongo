import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        min: 3,
        required: true

    },
    lastName: {
        type: String,
        min: 3,
        required: true

    },
    email: {
        type: String,
        unique: true,
        min: 3,
        max: 20,
        required: true
    },
    phone: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true,
        min: 3,
        max: 10,
    },
    role: {
        type: String,
        required: true,
        default: "normal",
    },

}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;