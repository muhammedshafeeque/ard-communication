import express from 'express'
import { Validate } from '../MiddleWare/Validation.js'
import { dseValidation, lineValidation, shopValidation } from '../Validations/configValidations.js'
import { createDse, createLine, createShop, deleteLine, getDses, getLines, getShops, removeShop, updateLines, updateShop } from '../Controllers/configController.js'
import { shopToLineMapping } from '../Controllers/mappingsController.js'
const router=express.Router()
router.post('/line',Validate(lineValidation),createLine)
router.get('/line',getLines)
router.patch('/line/:id',Validate(lineValidation),updateLines)
router.delete('/line/:id',deleteLine)
router.post('/dse',Validate(dseValidation),createDse)
router.get('/dse',getDses)
router.post('/shop',Validate(shopValidation),createShop)
router.patch('/shop/:id',Validate(shopValidation),updateShop)
router.get('/shop',getShops)
router.delete('/shop/:id',removeShop)
router.post('/user-dse-mapping',)
router.post('/dse-line-mapping',)
router.patch('/shop-line-mapping/:id',shopToLineMapping)
export const configRouter=router