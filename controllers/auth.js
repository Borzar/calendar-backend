const { response } = require('express')
const { validationResult } = require('express-validator')

// req: lo que la persona nececita
// res: lo que nosotros respondemos

// POST
const createUser = (req, res = response) => {

	const { name, email, password } = req.body
	
	res.status(201).json({
		"ok": true,
		msg: 'registro',
		name,
		email,
		password
	})
}

// POST
const loginUser = (req, res = response) => {

	const { email, password } = req.body

	res.json({
		"ok": true,
		msg: 'login',
		email,
		password
	})
}

// GET
const renewToken = (req, res = response) => {
	res.json({
		"ok": true,
		msg: 'renew'
	})
}

module.exports = {
	createUser,
	loginUser,
	renewToken

} 
