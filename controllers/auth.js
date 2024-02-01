const { response, request } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        // Verificar si el emial existe
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "Email or Password are not correct - Email",
            });
        }

        // Verificar si el usuario está activo
        if (!user.state) {
            return res.status(400).json({
                msg: "Email or Password are not correct - status: false",
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Email or Password are not correct - password: incorrect",
            });
        }

        // Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Something went wrong",
        });
    }
};


const googleSignIn = async (req = request, res = response) => {
    
    const { id_token } = req.body;
    try {
        
        const { name, img, email } = await googleVerify( id_token )
        // console.log(googleUser);

        let user = await User.findOne({ email })

        // Si el user no existe
        if ( !user ) {
            const data = {
                name,
                email, 
                password: ':)',
                img,
                google: true,
                role: 'USER_ROLE'
            }

            user = new User( data )
            await user.save()
        }

        // Si existe pero su state es false
        if ( !user.state ) {
            return res.status(401).json({
                msg: 'This user is blocked. Talk to the administrator'
            })
        }

        // Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            msg: 'El token no se pudo verificar',
            ok: false
        })
    }


}

module.exports = {
    login,
    googleSignIn
};
