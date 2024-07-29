const { nameValidator, emailValidator, birthDateValidator, addressValidator } = require('../../infrastructure/validators/validators');
const ValidationException = require('../../infrastructure/exception/validationException');

class Patient {
    constructor(name, email, birthDate, address) {
        if (!nameValidator(name)) {
            throw new ValidationException('Validation failed', 'Invalid name provided', 'patient.constructor');
        }
        this.name = name;

        if (!emailValidator(email)) {
            throw new ValidationException('Validation failed', 'Invalid email provided', 'patient.constructor');
        }
        this.email = email;

        if (!birthDateValidator(birthDate)) {
            throw new ValidationException('Validation failed', 'Invalid birth date provided', 'patient.constructor');
        }
        this.birthDate = birthDate;

        if (!addressValidator(address)) {
            throw new ValidationException('Validation failed', 'Invalid address provided', 'patient.constructor');
        }
        this.address = address;
    }
}

module.exports = Patient;

