import express from "express";
var router = express.Router();
import { ShopSync } from "../controller/Shop.controller.js";
import { GetShopDetails } from "../controller/Shop.controller.js";
// Get Shop Listing
router.get("/shopSync", ShopSync);
router.get("/getShopDetails", GetShopDetails);

export default router;
