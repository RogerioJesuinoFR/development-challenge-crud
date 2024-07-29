const nameValidator = (name) => {
    const regex = /^[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ][a-zA-Záàâãéêíóôõúç\s]*$/;
    return regex.test(name) && name.length > 0;
};

const emailValidator = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const birthDateValidator = (birthDate) => {
    const date = new Date(birthDate);
    if (isNaN(date.getTime())) {
        return false;
    }

    const currentDate = new Date();
    if (date > currentDate) {
        return false;
    }

    const maxAge = 150;
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - maxAge);

    return date >= maxDate;
};

const addressValidator = (address) => {
    return address.length > 4;
};

module.exports = { nameValidator, emailValidator, birthDateValidator, addressValidator };