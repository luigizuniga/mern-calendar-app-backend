const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response ) =>{
    const { email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });

        if( user ) {
            return res.status(400).json({
                ok:false,
                msg: 'This User already exists'   
            });
        }

        user = new User( req.body );

        // Encriptacion password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        // Guardar datos user
        await user.save();

        // Generar JWT
        const token = await generateJWT( user.id , user.name );

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Contact with your Admin'
        });
    }
} 

const loginUser = async(req, res = response) => { 
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if( !user ) {
            return res.status(400).json({
                ok:false,
                msg: 'This user already not exists with this email'   
            });
        }

        // Confirmacion de password
        const validatePassword = bcrypt.compareSync( password, user.password );

        if(!validatePassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password wrong'
            });  
        }

        // Generar JWT
        const token = await generateJWT( user.id, user.name );

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });  

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Contact with your Admin'
        }); 
    }
}

module.exports = {
    createUser,
    loginUser
}
