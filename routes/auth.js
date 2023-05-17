/* 
    Rutas usuarios => / Auth
    host + /api/auth
 */
    const { Router } = require('express');
    const { check } = require('express-validator');
    const { validatorInputs } = require('../middlewares/validator-inputs');
    const { createUser, loginUser } = require('../controllers/auth');
    // const { validarJWT } = require('../controllers/validat-JWT');

    const router = Router();

    router.post('/new',[
        check('name','Name is required').not().isEmpty(),
        check('email','Email is required').isEmail(),
        check('password','Password must be 6 characters').isLength({ min: 6 }),
        validatorInputs
    ], createUser );


    router.post(
        '/',
        [
            check('email','Email is required').not().isEmpty(),
            check('password','Password must be 6 characters').isLength({ min: 6 }),
            validatorInputs
        ],loginUser );

    module.exports = router;
    