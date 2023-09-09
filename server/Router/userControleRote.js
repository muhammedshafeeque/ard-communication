import express from 'express'
import { verifyUser } from '../MiddleWare/Auth.js'
import {  createUser } from '../Controllers/user.js'
const router=express.Router()
router.post('/create-user',createUser)
router.delete('/delete-user',)
export const uerControlsRouter=router