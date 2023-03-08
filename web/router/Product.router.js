import express from "express";
import { GetProduct } from "../controller/Product.controller.js";
import { UpsertProduct } from "../controller/Product.controller.js";
const app=express();
app.use(express.json());
var router=express.Router();

// Get Shop Listing
router.get("/getProduct",GetProduct);
router.post("/upsertProduct",UpsertProduct);

export default router;

