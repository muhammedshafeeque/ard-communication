import  express  from "express";
import { getSaleData } from "../Controllers/Viz.Controller.js";
const router =express.Router()
router.get('/sale',getSaleData)
export const VisualizationRouter=router