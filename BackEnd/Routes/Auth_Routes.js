const { signup, login } = require('../Controlers/authController');
const {signupValidation, loginValidation} =require ('../Middlewares/AuthValidation');
const { Product } = require('../Models/User');
const Router= require('express').Router();
Router.post('/signup',signupValidation,signup)
Router.post('/login',loginValidation,login)


module.exports = Router;