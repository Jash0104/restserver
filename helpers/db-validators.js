const Role = require('../models/role');
const User = require('../models/user')

const validRole = async (role = '') => {
    const existRole = await Role.findOne({ role })
    if (!existRole) {
        throw new Error(`Role '${role}' is not registred in the database`)
    }
}

const emailExistence = async ( email = '' ) => {
    const existEmail = await User.findOne({ email });

    if (existEmail) {
        throw new Error('Email is already registred')
    }
}

const idUserExist = async ( id ) => {
    const existUser = await User.findById(id)

    if ( !existUser ) {
        throw new Error('Entered id is not in the database')
    }
}


module.exports = {
    validRole,
    emailExistence,
    idUserExist
}