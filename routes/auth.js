
/*
	
	Rutas de Usuarios / Auth
	host + /api/auth

*/

const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')

const { createUser, loginUser, renewToken } = require('../controllers/auth')

router.post(
	'/new',
	[ // middlewares
		check('name', 'El nombre es obligario').not().isEmpty(),
		check('email', 'El email es obligario').isEmail(), 
		check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }), 
	],
	createUser)


router.post('/', 
	[// middlewares
		check('email', 'El email es obligario').isEmail(), 
		check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }), 
	],
	loginUser )

router.get('/renew', renewToken )

module.exports = router

