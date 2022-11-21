import mongoose from "mongoose";
import Medicine from "./medicines.model";
const PrescriptionSchema = new mongoose.Schema({
    token: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['sensitive', 'numeric'],
        default: 'sensitive'
    },
    doctor: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        enum: ['paid', 'not-paid'],
        default: 'not-paid'
    },
    patient: {
        type: String,
        required: true
    },
    medicines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine"
    }, ],
    offeredDate: {
        type: Date,
        default: new Date()
    }
});

const Prescription = mongoose.model('Prescription', PrescriptionSchema);
export default Prescription;