const { check } = require('express-validator');

module.exports = [
    check("name")
        .notEmpty()
        .withMessage("Deberá colocar el nombre del producto"),

    check("price")
        .notEmpty()
        .withMessage("Deberá colocar el precio del producto"),

    check("description")
        .notEmpty()
        .withMessage("Debe tener una descripción")
]
