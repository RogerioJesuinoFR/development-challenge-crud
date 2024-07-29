import React, { useState } from 'react';
import { Box, Grid, Snackbar, Alert } from '@mui/material';
import AppBarComponent from './AppBarComponent';
import PatientsPage from './Patients/index';

function App() {
  const [activePage, setActivePage] = useState('Patients');
  const [snack, setSnack] = useState({ open: false, message: '', type: '' });

  const pages = ["Patients"];

  const openSnackBar = (messageSnackBar, typeSnackBar) => {
    setSnack({ open: true, message: messageSnackBar, type: typeSnackBar });
  };

  const closeSnackBar = () => {
    setSnack({ open: false, message: '', type: '' });
  };

  const handleChangePage = (page) => {
    setActivePage(page);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AppBarComponent pages={pages} activePage={activePage} handleChangePage={handleChangePage} />
          </Grid>
          <Grid item xs={12}>
            {activePage === 'Patients' && <PatientsPage openSnackBar={openSnackBar} />}
          </Grid>
        </Grid>
      </Box>
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={closeSnackBar}>
        <Alert onClose={closeSnackBar} severity={snack.type} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
