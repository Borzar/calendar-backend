/* Event Routes 
 
 /api/events

*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/events')

const router = Router();

router.use(validarJWT )

// Obtener evento
router.get('/', getEvents);

// Crear un nuevo evento
router.post('/', createEvent);

// Actualizar evento
router.put('/:id', updateEvent);

// Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;
