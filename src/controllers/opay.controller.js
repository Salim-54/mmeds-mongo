import Payment from '../database/model/payments.model';
import Prescription from '../database/model/prescription.model';
import { handleUpdate, handleCreate } from '../helper/general.helper';



exports.handlePayment = async(req, res) => {

    const status = req.body.status;
    const statusCode = req.body.statusCode;
    const transactionId = req.body.transactionId;


    try {

        const prescription = await Prescription.findOne({ transactionId: transactionId });
        const transaction = await Payment.findOne({ transactionId: transactionId });

        (prescription && statusCode == 200) ? await handleUpdate(Prescription, prescription._id, { payment: "paid" }, res): console.log("May be txn was not success!!");
        transaction ? await handleUpdate(Payment, transaction._id, { status: status }, res) : console.log("noo payment ID");
        return res.status(200).json({ message: "ibintu ni wanee!!" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Oops! something went wrong!" })
    }

}