
const express = require('express')
const { appointment } = require('../controllers/appointment')
const {contact}= require('../controllers/contact')
 const {newsLetter}= require('../controllers/newsletter')
const router = express.Router()

router.post('/appointment', appointment)
router.post('/contact', contact)
router.post('/newsletter', newsLetter)

module.exports = router