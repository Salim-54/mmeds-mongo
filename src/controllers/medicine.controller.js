import Medicine from '../database/model/medicines.model';
import Prescription from '../database/model/prescription.model';
import { handleCreate } from "../helper/general.helper.js";



exports.createMedicine = async(req, res) => {
    const {
        medName,
        medNumber,
        medPrice,
        medPicture,
        medComment,
        medPin,
        pattern
    } = req.body;
    try {

        const newMedicine = {
            medName,
            medNumber,
            medPrice,
            medPicture,
            medPin,
            medComment,
            pattern
        };
        const createdMedicine = await handleCreate(Medicine, newMedicine, res);
        createdMedicine ? res.status(201).json(createdMedicine) : res.status(500).json({ message: "Internal server error!" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ooops! something went wrong!" })
    }

};

exports.saveMedicine = async(req, res, next) => {


    const prescriptionId = req.params.id;
    const wroteTo = await Prescription.findById(prescriptionId)
    const newMedicine = await Medicine.create({

        medName: req.body.medName,
        medNumber: req.body.medNumber,
        pattern: req.body.pattern,
    });


    const prescription = await Prescription.findById(prescriptionId);
    prescription.medicines.push(newMedicine);
    await prescription.save(function(error) {

        res.status(201).json({
            status: 'success',
            data: {
                comment: newMedicine
            }
        });
    });
}

exports.getAllMedicines = async(req, res) => {
    const medicines = await Medicine.find();
    res.status(200).json({
        status: 'success',
        results: medicines.length,
        data: {
            medicines
        }
    });
};