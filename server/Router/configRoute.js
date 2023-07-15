import express from "express";
import { Validate } from "../MiddleWare/Validation.js";
import {
  dseValidation,
  lineValidation,
  mapLineToDseValidation,
  mapUserToDseValidation,
  shopValidation,
} from "../Validations/configValidations.js";
import {
  createDse,
  createLine,
  createShop,
  deleteLine,
  getDses,
  getLines,
  getShops,
  removeShop,
  updateLines,
  updateShop,
} from "../Controllers/configController.js";
import {
  dseLineMapping,
  shopToLineMapping,
  userDsemapping,
} from "../Controllers/mappingsController.js";
const router = express.Router();
router.post("/line", Validate(lineValidation), createLine);
router.get("/line", getLines);
router.patch("/line/:id", Validate(lineValidation), updateLines);
router.delete("/line/:id", deleteLine);
router.post("/dse", Validate(dseValidation), createDse);
router.get("/dse", getDses);
router.post("/shop", Validate(shopValidation), createShop);
router.patch("/shop/:id", Validate(shopValidation), updateShop);
router.get("/shop", getShops);
router.delete("/shop/:id", removeShop);
router.patch("/user-dse-mapping/:id",Validate(mapUserToDseValidation), userDsemapping);
router.patch("/dse-line-mapping/:id",Validate(mapLineToDseValidation), dseLineMapping);
router.patch("/shop-line-mapping/:id", shopToLineMapping);
export const configRouter = router;
