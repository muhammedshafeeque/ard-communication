import express from 'express'
import { getUsers, resetPassword } from '../Controllers/user.js'
import { Validate } from '../MiddleWare/Validation.js'
import { resetPasswordValidate } from '../Validations/UserValidation.js'
const router=express.Router()
router.get('/users',getUsers)
router.post('/reset-password',Validate(resetPasswordValidate),resetPassword)
export const userRouter=router