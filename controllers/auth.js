const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs')

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
				msg: 'Un usuario con ese correo',
			});
		}

		usuario = new Usuario(req.body);
		
		// Encriptar contraseña
		const salt = bcrypt.genSaltSync()	
		usuario.password = bcrypt.hashSync( password, salt )

		await usuario.save();

		res.status(201).json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
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
const loginUser = (req, res = response) => {
	const { email, password } = req.body;

	res.json({
		ok: true,
		msg: 'login',
		email,
		password,
	});
};

// GET
const renewToken = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'renew',
	});
};

module.exports = {
	createUser,
	loginUser,
	renewToken,
};
