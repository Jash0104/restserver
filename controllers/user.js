const { request, response } = require("express");

const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const getUsers = async (req = request, res = response) => {
    // Extraemos a traves de los query params para indicar start point and limit de la búsqueda
    const {limit = 5, start = 0} = req.query;
    const query = { state: true }

    const [total, users] = await Promise.all([
        await User.countDocuments(query),
        await User.find(query)
            .skip( Number(start))
            .limit(Number(limit))
    ]);
    
    res.json({
        total,
        users
    });
};

const postUsers = async (req = request, res = response) => {

    // Desetructuramos el body
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user,
    });
};

const updateUsers = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...userbody } = req.body

    // Encriptar la contraseña
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        userbody.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id, userbody )

    res.json(user);
};

const deleteUsers = async (req = request, res = response) => {
    const { id } = req.params;
    const { authenticatedUser } = req

    // Borrar fisicamente
    // const deletedUser = await User.findByIdAndDelete(id)
    await User.findByIdAndUpdate(id, { state: false })
    const user = await User.findById(id)

    res.json({
        user,
        authenticatedUser
    });
};

module.exports = {
    getUsers,
    postUsers,
    updateUsers,
    deleteUsers,
};
