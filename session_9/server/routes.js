const express = require('express')
const router = new express.Router()

const authHandlers = require('./modules/auth')
const productHandlers = require('./modules/product')

router.post('/api/auth/sign-up', authHandlers.signUp)

router.post('/api/auth/sign-in', authHandlers.signIn)

router.get('/api/product', productHandlers.findMany)

router.get('/api/product/:id', productHandlers.findOne)

router.post('/api/product', productHandlers.create)

router.put('/api/product', productHandlers.update)

router.delete('/api/product/:id', productHandlers.delete)

module.exports = router