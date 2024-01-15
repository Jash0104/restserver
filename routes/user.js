const Router = require('express');
const { getUsers, putUsers, postUsers, deleteUsers } = require('../controllers/user');

const router = Router()

router.get('/', getUsers)

router.post('/', postUsers)

router.put('/:id', putUsers)

router.delete('/', deleteUsers)

module.exports = router