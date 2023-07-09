import express from 'express'
const router=express.Router()
router.post('/signup')
router.post('/login')
router.get('/get-req-user')
export const AuthRouter=router