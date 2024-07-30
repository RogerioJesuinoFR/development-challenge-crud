const express = require('express');
const Patient = require('../../domain/entities/patient');
const patientService = require('../../application/services/patients');
const ValidationException = require('../../infrastructure/exception/validationException');
const ErrorResponse = require('../../infrastructure/exception/errorResponse');

const router = express.Router();

const handleErrors = (error, res) => {
    if (error instanceof ValidationException) {
      res.status(400).json(new ErrorResponse('Bad Request', error.title, error.message, 400));
    } else if (error.name === 'CastError') {
      res.status(400).json(new ErrorResponse('Bad Request', 'Invalid ID format', error.message, 400));
    } else if (error.name === 'ValidationError') {
      res.status(400).json(new ErrorResponse('Bad Request', 'Validation Error', error.message, 400));
    } else {
      res.status(500).json(new ErrorResponse('Internal Server Error', 'Could not process the request', error.message, 500));
    }
  };
  

router.post('/', async (req, res) => {
    try {
        console.log('Creating patient with data:', req.body);
        const patient = new Patient(req.body.name, req.body.email, req.body.birthDate, req.body.address);
        const newPatient = await patientService.createPatient(patient);
        res.status(201).json(newPatient);
    } catch (error) {
        handleErrors(error, res);
    }
});

router.put('/:id', async (req, res) => {
    try {
      console.log(req.body);
      const updatedPatient = await patientService.updatePatientById(req.params.id, req.body);
      res.json(updatedPatient);
    } catch (error) {
      handleErrors(error, res);
    }
  });

router.delete('/:id', async (req, res) => {
    try {
        await patientService.deletePatientById(req.params.id);
        res.status(204).send();
    } catch (error) {
        handleErrors(error, res);
    }
});

router.get('/', async (req, res) => {
    try {
        const patients = await patientService.getAllPatients();
        res.json(patients);
    } catch (error) {
        handleErrors(error, res);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const patient = await patientService.getPatientById(req.params.id);
        res.json(patient);
    } catch (error) {
        handleErrors(error, res);
    }
});

module.exports = router;