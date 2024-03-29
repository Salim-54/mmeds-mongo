import Prescription from '../database/model/prescription.model';
import AppError from '../utils/appError';
import fileUpload from '../utils/fileUpload';

import catchAsync from '../utils/catchAsync'


exports.savePrescription = catchAsync(async(req, res, next) => {

    let prescription = (req.body)

    if (req.file) {
        req.body.image = await fileUpload(req);
    } else {
        req.body.image =
            "https://res.cloudinary.com/salim-atlp-brand/image/upload/v1647272711/article_vmtmzu.png";
    }

    let newPrescription = await new Prescription(prescription);
    newPrescription.save();


    res.status(201).json({
        status: 'success',
        data: {
            prescription: newPrescription
        }
    });
});


exports.getAllPrescriptions = async(req, res) => {
    const prescriptions = await Prescription.find();
    res.status(200).json({
        status: 'success',
        results: prescriptions.length,
        data: prescriptions
    });
};


exports.getPrescriptionById = catchAsync(async(req, res, next) => {
    const prescription = await Prescription.findById(req.params.id).populate("medicines");

    if (!prescription) {
        return next(new AppError('No blog found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: prescription
    });
});


exports.getPrescriptionByToken = catchAsync(async(req, res, next) => {
    let { token } = req.body

    const prescription = await Prescription.findOne({ token: token }).populate("medicines");

    if (!prescription) {

        res.status(404).json({
            status: 'Huuzo bro',

        });
        return next(new AppError('No prescription found with that token', 404));
    }

    res.status(200).json({
        status: 'success',
        data: prescription
    });
});



exports.updatePrescriptionsById = async(req, res) => {
    try {

        const prescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                prescription
            }
        });
        // if(!Prescription) return res.status(404).json({success: false, message: "Prescription not found"}) ;
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }

};

exports.deletePrescriptionById = async(req, res) => {
    try {
        await Prescription.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: `Prescription with id: ${req.params.id} is deleted successfully!!`
        });
        // if(!Prescription) return res.status(404).json({success: false, message: "Prescription not found"}) ;
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }

}