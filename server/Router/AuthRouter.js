import express from 'express'
import { doLogin, doRegister, getRequestUser } from '../Controllers/Auth.js'
import { verifyUser } from '../MiddleWare/Auth.js'
const router=express.Router()
router.post('/signup',doRegister)
router.post('/login',doLogin)
router.get('/get-req-user',verifyUser,getRequestUser)
router.post
export const AuthRouter=router