const { response, request } = require("express")
const User = require('../models/user')
const jwt = require("jsonwebtoken")


const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('jash-token')

    if ( !token ) {
        return res.status(401).json({
            msg: 'Token is missing in the request. Unathorized'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETKEY)

        const authenticatedUser = await User.findById( uid )
        if ( !authenticatedUser ) {
            return res.status(401).json({
                msg: 'Invalid token - User does not exist in the Database'
            })
        }
        
        if ( !authenticatedUser.state) {
            return res.status(401).json({
                msg: 'Invalid token - User with false state'
            })
        }
        req.authenticatedUser = authenticatedUser
        req.uid = uid

        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token. Unathorized'
        })
    }
}

module.exports = {
    validateJWT
}