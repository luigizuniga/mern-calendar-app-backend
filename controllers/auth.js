const { response } = require('express');
const User = require('../models/User');

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

        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Contact with your Admin'
        });
    }
} 

module.exports = {
    createUser
}
