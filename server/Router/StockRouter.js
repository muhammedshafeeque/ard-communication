import express from 'express'
import { Validate } from '../MiddleWare/Validation.js'
import { stockValidation } from '../Validations/stockValidations.js'
import { addStock, getStocks } from '../Controllers/StockController.js'
const router=express.Router()
router.post('/stock',Validate(stockValidation),addStock)
router.get('/stock',getStocks)
export const stockRouter=router