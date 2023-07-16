import express from 'express'
import { Validate } from '../MiddleWare/Validation.js'
import { stockValidation } from '../Validations/stockValidations.js'
import { addStock } from '../Controllers/StockController.js'
const router=express.Router()
router.post('/stock',Validate(stockValidation),addStock)
export const stockRouter=router