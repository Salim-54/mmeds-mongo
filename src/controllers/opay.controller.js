import Payment from '../database/model/payments.model';
import Prescription from '../database/model/prescription.model';
import { handleUpdate, handleCreate } from '../helper/general.helper';



exports.handlePayment = async(req, res) => {

    const status = req.body.status;
    const transactionId = req.body.transactionId;


    const transaction = await Payment.findOne({ opayId: transactionId })

    if (transaction) {
        try {
            const prescription = await Prescription.findOne({ transactionId: transaction.transactionId })
            const payed = await handleUpdate(Payment, transaction._id, { status: status }, res);
            const transacted = await handleUpdate(Prescription, prescription._id, { payment: "paid" }, res);
            console.log(req.body);
            return res.status(200).json({ txn: transaction, prescription: prescription, })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Oops! something went wrong!" })
        }

    }
};