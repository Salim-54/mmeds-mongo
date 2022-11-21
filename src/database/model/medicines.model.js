import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema({
    medName: {
        type: String,
        required: true
    },
    medNumber: {
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