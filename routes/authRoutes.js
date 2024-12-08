const express = require('express')
const {handleregister,handlelogin,handleforgetpassword, handlereset,getMe} = require('../controllers/authController')
const {auth} = require('../middlewares/auth')
const router = express.Router()

router.post('/register',handleregister)
router.post('/login',handlelogin)
router.post('/forgot',handleforgetpassword)
router.post('/reset',handlereset)
router.get('/me', auth, getMe);

module.exports = router