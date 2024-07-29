const Sequelize = require('sequelize');
const sequelize = require('../../infrastructure/database/db');

const Patient = sequelize.define('patient', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    birthDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
        },
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Patient;