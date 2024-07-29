import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { getPatients, addPatient, updatePatient, removePatient as apiRemovePatient } from '../external/medcloud-apiclient';
import PatientForm from './PatientForm';

const PatientList = lazy(() => import('./PatientList'));

export default function PatientsPage({ openSnackBar }) {
  const [patientsList, setPatientsList] = useState([]);
  const [patientToEdit, setPatientToEdit] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatientsList(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  function addOrUpdatePatient(patient) {
    const existingPatientIndex = patientsList.findIndex(p => p.id === patient.id);
    if (existingPatientIndex !== -1) {
      updatePatient(patient.id, patient)
        .then(updatedPatient => {
          const updatedPatients = [...patientsList];
          updatedPatients[existingPatientIndex] = updatedPatient;
          setPatientsList(updatedPatients);
          openSnackBar('Paciente atualizado com sucesso', 'success');
        })
        .catch(error => openSnackBar('Erro ao atualizar paciente', 'error'));
    } else {
      addPatient(patient)
        .then(newPatient => {
          setPatientsList([...patientsList, newPatient]);
          openSnackBar('Paciente cadastrado com sucesso', 'success');
        })
        .catch(error => openSnackBar('Erro ao cadastrar paciente', 'error'));
    }
    setPatientToEdit(null);
  }

  function removePatient(patientId) {
    apiRemovePatient(patientId)
      .then(() => {
        setPatientsList(patientsList.filter(patient => patient.id !== patientId));
        openSnackBar('Paciente removido com sucesso', 'success');
      })
      .catch(error => openSnackBar('Erro ao remover paciente', 'error'));
  }

  function editPatient(patient) {
    setPatientToEdit(patient);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <PatientForm addOrUpdatePatient={addOrUpdatePatient} patientToEdit={patientToEdit} />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={6}>
          <Suspense fallback={<div>Loading...</div>}>
            <PatientList patientsList={patientsList} removePatient={removePatient} editPatient={editPatient} />
          </Suspense>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Box>
  );
}