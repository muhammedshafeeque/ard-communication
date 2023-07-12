import express from 'express'
import { Validate } from '../MiddleWare/Validation.js'
import { lineValidation } from '../Validations/configValidations.js'
import { createLine, deleteLine, getLines, updateLines } from '../Controllers/configController.js'
const router=express.Router()
router.post('/line',Validate(lineValidation),createLine)
router.get('/line',getLines)
router.patch('/line/:id',Validate(lineValidation),updateLines)
router.delete('/line/:id',deleteLine)
export const configRouter=router