import express from "express";
var router=express.Router();
import { ShopSync } from "../controller/Shop.controller";

// Get Shop Listing
router.get("/sync",ShopSync);

export default router;