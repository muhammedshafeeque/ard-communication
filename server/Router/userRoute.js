import express from 'express'
import { getUsers } from '../Controllers/user.js'
const router=express.Router()
router.get('/users',getUsers)
export const userRouter=router