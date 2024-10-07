const express = require('express')

const router = express.Router()

const {paystackPayment} = require('../controllers/paystack')

router.post('/payment', paystackPayment)

module.exports = router