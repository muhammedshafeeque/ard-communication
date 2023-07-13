import express from 'express'
import { Validate } from '../MiddleWare/Validation.js'
import { dseValidation, lineValidation } from '../Validations/configValidations.js'
import { createDse, createLine, deleteLine, getDses, getLines, updateLines } from '../Controllers/configController.js'
const router=express.Router()
router.post('/line',Validate(lineValidation),createLine)
router.get('/line',getLines)
router.patch('/line/:id',Validate(lineValidation),updateLines)
router.delete('/line/:id',deleteLine)
router.post('/dse',Validate(dseValidation),createDse)
router.get('/dse',getDses)
router.patch('/dse/:id',Validate(dseValidation))
router.delete('/dse/:id')

export const configRouter=router