const { check } = require('express-validator');

module.exports = [
    check("name")
        .notEmpty()
        .withMessage("Deberá colocar como minimo 2 letras"),

    check("price")
        .notEmpty()
        .withMessage("Deberá colocar como minimo 2 letras"),

    check("description")
        .notEmpty()
        .withMessage("Debe tener entre 6 y 12 caracteres")
]
