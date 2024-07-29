import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export default function AppBarComponent({ pages, activePage, handleChangePage }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gestão de Pacientes
          </Typography>
          {pages.map((page) => (
            <Button
              key={page}
              color="inherit"
              onClick={() => handleChangePage(page)}
              disabled={page === activePage}
            >
              {page}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
