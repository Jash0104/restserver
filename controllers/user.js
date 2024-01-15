const { request, response } = require('express')


const getUsers = (req = request, res = response) => {
    
    const query = req.query

    res.json({
        msg: 'get API - Controller',
        query
    })
}

const postUsers = (req = request, res = response) => {
    const { name, age} = req.body;
    console.log(name, age);

    res.json({
        msg: 'post API - Controller'
    })
}

const putUsers = (req = request, res = response) => {

    const { id } = req.params
    console.log(id);
    res.json({
        msg: 'put API - Controller',
        id
    })
}

const deleteUsers = (req = request, res = response) => {
    res.json({
        msg: 'delete API - Controller'
    })
}


module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}