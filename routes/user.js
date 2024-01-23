const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, 
        validateJWT, 
        isAdminRole, 
        hasThisRole } = require("../middlewares")

const { validRole, emailExistence, idUserExist } = require("../helpers/db-validators");

const {
    getUsers,
    postUsers,
    deleteUsers, 
    updateUsers } = require("../controllers/user");

const router = Router();

router.get("/", getUsers);

router.post("/", [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must contain almost 6 characters').isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    check('role').custom( validRole ),
    check('email').custom( emailExistence ),
    validateFields,
], postUsers);

router.put("/:id", [
    check('id', 'Entered id is not a valid MongoID').isMongoId(),
    check('id').custom( idUserExist ),
    check('role').custom( validRole ),
    validateFields
], updateUsers);

router.delete("/:id", [
    validateJWT,
    // isAdminRole,
    hasThisRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'Entered id is not a valid MongoID').isMongoId(),
    check('id').custom( idUserExist ),
    validateFields
], deleteUsers);

module.exports = router;
