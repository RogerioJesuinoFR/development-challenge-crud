import React, { useState, memo, useEffect } from 'react';
import { Box, TextField, Button, Grid, Typography } from '@mui/material';
import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';

const PatientForm = memo(({ addOrUpdatePatient, patientToEdit }) => {
  const [formData, setFormData] = useState({ id: '', name: '', email: '', birthDate: '', address: '' });
  const [errors, setErrors] = useState({ name: '', email: '', birthDate: '' });

  useEffect(() => {
    if (patientToEdit) {
      setFormData(patientToEdit);
    }
  }, [patientToEdit]);

  const handleClearForm = () => {
    setFormData({ id: '', name: '', email: '', birthDate: '', address: '' });
    setErrors({ name: '', email: '', birthDate: '' });
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = { name: '', email: '', birthDate: '' };
    let isValid = true;

    // Name validation
    if (!/^[A-Z][a-zA-Z]+(?:\s[A-Z][a-zA-Z]+)+$/.test(formData.name)) {
      newErrors.name = 'Nome deve começar com letra maiúscula e ter pelo menos um sobrenome.';
      isValid = false;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email deve conter um "@"';
      isValid = false;
    }

    // Birth date validation
    const minDate = new Date('1874-01-01');
    const birthDate = new Date(formData.birthDate);
    if (isNaN(birthDate) || birthDate < minDate) {
      newErrors.birthDate = 'Data de nascimento inválida';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmitButton = () => {
    if (validateForm()) {
      if (!formData.id) {
        formData.id = new Date().getTime().toString();
      }
      addOrUpdatePatient(formData);
      handleClearForm();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom align="center" sx={{ letterSpacing: '.1rem' }}>
              {formData.id ? 'Editar Paciente' : 'Novo Paciente'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="name"
              name="name"
              label="Nome"
              variant="standard"
              value={formData.name}
              onChange={handleChangeForm}
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              type="email"
              variant="standard"
              value={formData.email}
              onChange={handleChangeForm}
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="birthDate"
              name="birthDate"
              label="Data de Nascimento"
              type="date"
              variant="standard"
              value={formData.birthDate}
              onChange={handleChangeForm}
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors.birthDate}
              helperText={errors.birthDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Endereço"
              variant="standard"
              value={formData.address}
              onChange={handleChangeForm}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button
                type="button"
                variant="outlined"
                startIcon={<ClearAllRoundedIcon />}
                onClick={handleClearForm}
                disabled={!formData.name && !formData.email && !formData.birthDate && !formData.address}
              >
                Limpar
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="button"
                variant="contained"
                startIcon={<DoneOutlineRoundedIcon />}
                onClick={handleSubmitButton}
                disabled={!formData.name || !formData.email || !formData.birthDate || !formData.address}
              >
                Salvar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
});

export default PatientForm;