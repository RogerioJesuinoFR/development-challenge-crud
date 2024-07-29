import React, { useEffect, useState } from 'react';
import { getPatients } from '../external/medcloud-apiclient';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function PatientList({ patientsList, setPatientsList, removePatient, editPatient }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPatients, setTotalPatients] = useState(0);

  const fetchPatients = async (page, limit) => {
    try {
      const data = await getPatients(page + 1, limit);
      setPatientsList(data.patients);
      setTotalPatients(data.totalCount);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    fetchPatients(0, newRowsPerPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="patient table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nome</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Data de Nascimento</TableCell>
            <TableCell align="center">Endereço</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientsList.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell align="center">{patient.name}</TableCell>
              <TableCell align="center">{patient.email}</TableCell>
              <TableCell align="center">{patient.birthDate}</TableCell>
              <TableCell align="center">{patient.address}</TableCell>
              <TableCell align="center">
                <IconButton aria-label="edit" onClick={() => editPatient(patient)}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => removePatient(patient.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {patientsList.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Nenhum paciente encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalPatients}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
