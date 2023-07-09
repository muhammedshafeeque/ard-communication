import express from 'express'
import { verifyUser } from '../MiddleWare/Auth.js'
import { craeteUser } from '../Controllers/user.js'
const router=express.Router()
router.post('/create-user',craeteUser)
router.delete('/delete-user',)
export const uerControleRouter=router