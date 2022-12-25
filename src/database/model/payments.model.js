import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    buyerName: {
        type: String,
        required: false
    },
    medBought: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    },
    paidAmount: {
        type: Number,
        required: false
    },
    transactionId: {
        type: String,
        required: false
    },
    opayId: {
        type: String,
        required: false
    },
    transactionDate: {
        type: Date,
        default: new Date()
    }
});

const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;