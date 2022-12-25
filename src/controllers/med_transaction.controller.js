import axios from 'axios';
import Prescription from '../database/model/prescription.model';
import Medicine from '../database/model/medicines.model';
import Payment from '../database/model/payments.model';
import { handleCreate } from "../helper/general.helper.js";
import tokenGenerator from '../utils/tokenGenerator';
import generateTransactionId from "../utils/transactionIdGenerator"




exports.startMedTransaction = async(req, res) => {
    const medToBuyId = req.params.id;

    const medToBuy = await Medicine.findById(medToBuyId)
    if (medToBuy) {
        try {
            const generatedToken = tokenGenerator(1, 100000);
            const transactionId = generateTransactionId();
            const newPrescription = {
                token: generatedToken,
                transactionId: transactionId,
                patient: `${req.user.firstName +" " +  req.user.lastName  }`,
            };

            const createdPrescription = await handleCreate(Prescription, {...newPrescription, medicines: medToBuyId }, res);
            const paymentObject = {
                telephoneNumber: req.user.phone,
                amount: medToBuy.medPrice,
                organizationId: "9c16b914-cf9e-4369-b18e-642ebcc46016",
                description: "Payment",
                callbackUrl: "http://3.91.178.169/api/v1/callback",
                transactionId: transactionId
            }
            axios.post('https://opay-api.oltranz.com/opay/paymentrequest', paymentObject)
                .then((response) => {
                    const resp = response.data;
                    console.log(resp);
                    const newPayment = {
                        buyerName: `${req.user.firstName +" " +  req.user.lastName  }`,
                        paidAmount: medToBuy.medPrice,
                        transactionId: transactionId,
                        opayId: resp.body.transactionId,
                        medBought: medToBuy._id,
                        status: resp.status
                    }
                    const createdPayment = handleCreate(Payment, newPayment, res);
                    if (!createdPayment) {
                        console.log("byanze pah");
                        return createdPayment
                    }

                })
                .catch((error) => {
                    console.error(error);
                });
            // const opayRequest = request(options, (error, response, body) => {
            //     if (error) {
            //         console.error(error);
            //         return;
            //     } else {
            //         console.log(body);
            //         // await
            //         return  response.statusCode;
            //     }
            // })


            // const newPayment = {
            //     buyerName: `${req.user.firstName +" " +  req.user.lastName  }`,
            //     paidAmount: medToBuy.medPrice,
            //     transactionId: transactionId,
            //     opayId: response.body.transactionId,
            //     medBought: medToBuy._id,
            //     status: response.status
            // }
            // const createdPayment = handleCreate(Payment, newPayment, res);
            // if (!createdPayment) {
            //     console.log("byanze pah");
            //     return
            // }
            // console.log(opayRequest)


            if (createdPrescription) {
                res.status(201).json(createdPrescription)
            } else res.status(500).json({ message: "Internal server error!" })
        } catch (error) {
            return res.status(500).json({ message: "Oops! something went wrong!" })
        }

    }
}
exports.payMedTransaction = async(req, res) => {
    const medToBuyId = req.params.id;

    const medToBuy = await Medicine.findById(medToBuyId)
    if (medToBuy) {
        try {
            const generatedToken = tokenGenerator(1, 100000);
            const transactionId = generateTransactionId();
            const newPrescription = {
                token: generatedToken,
                transactionId: transactionId,
                patient: `${req.user.firstName +" " +  req.user.lastName  }`,
            };

            const createdPrescription = await handleCreate(Prescription, {...newPrescription, medicines: medToBuyId }, res);
            if (createdPrescription) {
                res.status(201).json(createdPrescription)
            } else res.status(500).json({ message: "Internal server error!" })
        } catch (error) {
            return res.status(500).json({ message: "Oops! something went wrong!" })
        }

    }
}