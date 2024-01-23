const { request, response } = require("express")

const isAdminRole = (req = request, res = response, next) => {
    if ( !req.authenticatedUser ) {
        return res.status(500).json({
            msg: 'Role wants to be verified without token validation'
        }) 
    }

    const { role, name }= req.authenticatedUser
    
    if ( role !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${name} has no administrator privileges`
        }) 
    }

    next()
}

const hasThisRole = ( ...roles ) => {
    
    return ( req, res, next) => {
        if ( !req.authenticatedUser ) {
            return res.status(500).json({
                msg: 'Role wants to be verified without token validation'
            }) 
        }
    
        if (!roles.includes( req.authenticatedUser.role )) {
            return res.status(401).json({
                msg: `${req.authenticatedUser.name} has no permission to do this`
            }) 
        }
        next()
    }
}

module.exports = {
    isAdminRole,
    hasThisRole
}

