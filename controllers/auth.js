const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {generateJWT} = require('../helpers/jwt');

// req: lo que la persona nececita
// res: lo que nosotros respondemos

// POST
const createUser = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		let usuario = await Usuario.findOne({ email });

		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'Un usuario ya existe con ese correo',
			});
		}

		usuario = new Usuario(req.body);
		
		// Encriptar contraseña
		const salt = bcrypt.genSaltSync()	
		usuario.password = bcrypt.hashSync( password, salt )

		await usuario.save();

		// Generar JWT 
		const token = await generateJWT(usuario.id, usuario.name)	

		res.status(201).json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			token
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador',
		});
	}
};

// POST
const loginUser = async(req, res = response) => {
	const { email, password } = req.body;

	try {
		const usuario = await Usuario.findOne({ email })

		if (!usuario) {
			return res.status(400).json({
				ok:false,
				msg: 'El usuario no existe con ese email'
			})
		}

		// Confirmar las passwords
		const validPassword = bcrypt.compareSync(password, usuario.password)
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Password incorrecto'
			})
		}

		// Generar JWT 
		const token = await generateJWT(usuario.id, usuario.name)	

		res.json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			token
		})

	} catch (error) {
		console.log(error)
		res.status(400).json({
			ok: false,
			msg: 'Por favor hable con el administrador'
		})
	}

};

// GET
const renewToken = async(req, res = response) => {
	
	const { uid, name } = req

	// Generar JWT
	const token = await generateJWT(uid, name)

	res.json({
		ok: true,
		uid, name,
		token
	});
};

module.exports = {
	createUser,
	loginUser,
	renewToken,
};
