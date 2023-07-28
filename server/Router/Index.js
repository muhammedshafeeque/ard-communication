import express from 'express'
import { AuthRouter } from './AuthRouter.js'
import { verifyAdmin, verifyUser } from '../MiddleWare/Auth.js'
import { uerControleRouter } from './userControleRote.js'
import { userRouter } from './userRoute.js'
import { configRouter } from './configRoute.js'
import { stockRouter } from './StockRouter.js'
const router=express.Router()
router.use('/auth',AuthRouter)
router.use('/admin',verifyUser,verifyAdmin,uerControleRouter)
router.use('/user',verifyUser,userRouter)
router.use('/config',verifyUser,configRouter)
router.use('/stock',verifyUser,stockRouter)
export default router