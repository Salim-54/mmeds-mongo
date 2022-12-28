import mongoose from "mongoose";
import Medicine from "./medicines.model";
const PrescriptionSchema = new mongoose.Schema({
    token: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['sensitive', 'generic'],
        default: 'generic'
    },
    doctor: {
        type: String,
        required: true,
        default: "MMEDS Doctor's crew",
    },
    institution: {
        type: String,
        required: true,
        default: 'Megga-meds',
    },
    opayId: {
        type: String,
        required: false,
    },
    transactionId: {
        type: String,
        required: false,
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
    patientId: {
        type: String,
        required: false,
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