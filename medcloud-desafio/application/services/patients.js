const Patient = require('../../repository/models/patient');
const ValidationException = require('../../infrastructure/exception/validationException');
const DatabaseException = require('../../infrastructure/exception/databaseException');

const createPatient = async function (patient) {
    try {
        const newPatient = await Patient.create({
            name: patient.name,
            email: patient.email,
            birthDate: patient.birthDate,
            address: patient.address
        });
        return newPatient;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            throw new ValidationException('Validation failed', error.message);
        }
        throw new DatabaseException('Database Error', error.message);
    }
};

const updatePatientById = async function (id, patientData) {
    try {
      const patient = await Patient.findByPk(id);
      if (!patient) {
        throw new ValidationException('Patient not found', 'No patient found with the given ID');
      }
      patient.name = patientData.name;
      patient.email = patientData.email;
      patient.birthDate = patientData.birthDate;
      patient.address = patientData.address;
      await patient.save();
      return patient;
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
          throw new ValidationException('Validation failed', error.message);
      }
      throw new DatabaseException('Database Error', error.message);
    }
  };

const getAllPatients = async function () {
    try {
        const patients = await Patient.findAll();
        return patients;
    } catch (error) {
        throw new DatabaseException('Database Error', error.message);
    }
};

const getPatientById = async function (id) {
    try {
        const patient = await Patient.findByPk(id);
        if (!patient) {
            throw new ValidationException('Patient not found', 'No patient found with the given ID');
        }
        return patient;
    } catch (error) {
        throw new DatabaseException('Database Error', error.message);
    }
};

const deletePatientById = async function (id) {
    try {
        const deletedPatient = await Patient.destroy({
            where: { id }
        });

        if (!deletedPatient) {
            throw new ValidationException('Patient not found', 'No patient found with the given ID');
        }
        return { message: 'Patient deleted successfully' };
    } catch (error) {
        throw new DatabaseException('Database Error', error.message);
    }
};

module.exports = { createPatient, updatePatientById, getAllPatients, getPatientById, deletePatientById };
