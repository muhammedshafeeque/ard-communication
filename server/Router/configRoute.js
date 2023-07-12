import express from 'express'
import { Validate } from '../MiddleWare/Validation.js'
import { lineValidation } from '../Validations/configValidations.js'
import { createLine } from '../Controllers/configController.js'
const router=express.Router()
router.post('/line',Validate(lineValidation),createLine)
router.get('/lines',)
export const configRouter=router