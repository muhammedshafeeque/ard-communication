import express from 'express'
import { Validate } from '../MiddleWare/Validation.js'
import { stockValidation } from '../Validations/stockValidations.js'
import { addStock, getDseStocks, getStocks } from '../Controllers/StockController.js'
import { verifyAdmin } from '../MiddleWare/Auth.js'
const router=express.Router()
router.post('/stock',verifyAdmin,Validate(stockValidation),addStock)
router.get('/stock',getStocks)
router.get('/get-dse-stock',getDseStocks)
export const stockRouter=router