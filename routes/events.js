/* Event Routes 
 
 /api/events

*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/events');
const {isDate} = require('../helpers/isDate');

const router = Router();

router.use(validarJWT )

// Obtener evento
router.get('/', getEvents);

// Crear un nuevo evento
router.post('/',
	[
		check('title', 'El titulo es obligatorio').not().isEmpty(),
		check('start', 'La fecha es obligatoria').custom(isDate),
		check('end', 'Fecha de finalización es obligatoria').custom(isDate),
		validarCampos
	],
	createEvent);

// Actualizar evento
router.put('/:id', updateEvent);

// Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;
