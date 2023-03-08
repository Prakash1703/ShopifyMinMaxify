import express from "express";
import { GetCustomer } from "../controller/Customer.controller.js";
var router=express.Router();

// Get Shop Listing
router.get("/getCustomer",GetCustomer);

export default router;