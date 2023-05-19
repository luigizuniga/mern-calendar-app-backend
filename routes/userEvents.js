const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validatorInputs } = require('../middlewares/validator-inputs');

const { getEvents , createEvents, updateEnvent , deleteEvent } = require('../controllers/user-events');

const router = Router();

// Todas las rutas deben pasar por la validacion del JWT
router.use( validateJWT );

// Obtener events
router.get( '/', getEvents );

// Crear un nuevo event
router.post(
    '/',
    [
        check('title','Title is required').not().isEmpty(),
        check('start','Start date is required').custom( isDate ),
        check('end','End date is required').custom( isDate ),
        validatorInputs
    ],
    createEvents
);

//Actudalizar event
router.put(
    '/:id',
    [
        check('title','Title is required').not().isEmpty(),
        check('start','Start date is required').custom( isDate ),
        check('end','End date is required').custom( isDate ),
        validatorInputs
    ],
    updateEnvent
);

//Eliminar event
router.delete('/:id' , deleteEvent );

module.exports = router;