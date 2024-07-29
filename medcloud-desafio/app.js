require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.APP_PORT;
const patientRoutes = require('./presentation/routes/patients');
app.use(cors());
app.use(express.json());

app.use(express.json());
app.use('/patients', patientRoutes);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

