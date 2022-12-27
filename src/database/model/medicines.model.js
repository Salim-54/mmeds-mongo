import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema({
    medName: {
        type: String,
        required: true
    },
    medComment: {
        type: String,
        required: false
    },
    medPrice: {
        type: Number,
        required: true
    },
    medPicture: {
        type: String,
        required: false,
        default: "https://res.cloudinary.com/salim-atlp-brand/image/upload/v1672150488/mmeds/pil_typxzv.png"
    },
    medNumber: {
        type: Number,
        required: true
    },
    medPin: {
        type: Number,
        required: true
    },
    pattern: {
        type: String,
        enum: ['1-1-1', '1-1', '2-2-2', '2-2', '3-3-3', '3-3'],
        default: '1-1-1'
    },
    createDate: {
        type: Date,
        default: new Date()
    }
});

const Medicine = mongoose.model('Medicine', MedicineSchema);
export default Medicine;