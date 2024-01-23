const validateRoles = require("../middlewares/role-validator");
const validateFields = require("../middlewares/validations");
const validateJWT = require("../middlewares/validate-jwt");

module.exports = {
    ...validateRoles,
    ...validateFields,
    ...validateJWT
}
