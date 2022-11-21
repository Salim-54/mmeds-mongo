import Medicine from '../database/model/medicines.model';
import Prescription from '../database/model/prescription.model';

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