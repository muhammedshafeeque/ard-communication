import express from 'express'
import { Validate } from '../MiddleWare/Validation.js'
import { reportValidate } from '../Validations/reportValidations.js'
import { createReport, getReports } from '../Controllers/ReportController.js'
const router =express.Router()
router.post('/report',Validate(reportValidate),createReport)
router.get('/report',getReports)
export const ReportRouter=router