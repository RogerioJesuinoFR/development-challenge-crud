import React, { useEffect, useState } from 'react';
import { getPatients } from '../external/medcloud-apiclient';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function PatientList({ patientsList, setPatientsList, removePatient, editPatient }) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

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
  }, [setPatientsList]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - patientsList.length) : 0;

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
          {patientsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((patient) => (
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
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={patientsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Table>
    </TableContainer>
  );
}
