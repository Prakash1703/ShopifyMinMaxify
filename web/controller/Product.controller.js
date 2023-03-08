import { GetShopDetails } from "./Shop.controller.js";
import Shop from "../frontend/models/Shop.model.js";
import Product from "../frontend/models/Product.model.js";

export const GetProduct = async (req, res) => {
  try {
    const shopName = res.locals.shopify.session.shop;
    const shopTbl = await Shop.findOne({ where: { shop_domain: shopName } });
    console.log("SHOP ID:", shopTbl.dataValues.store_id);
    if(shopTbl.dataValues.store_id){
      let productList = await Product.findAll({
        where: { store_id: shopTbl.dataValues.store_id },attributes: [['product_id','id'],'store_id','title','handle','image','minQty','maxQty','published'] 
      });
      
      console.log("Product List WITH DATA LIST:", productList);
      res.status(200).send({
        msg: "Sucess while fetching Product data",
        success: 1,
        productList: productList,
      });
    }else{
      res.status(200).send({
        msg: "Sucess while fetching Product data",
        sucess: 0,
      });
    }
    
  } catch (error) {
    console.log("Error In Product Fetching on Load",error);
    res.status(500).send({
      msg: "Error while fetching product data",
      sucess: 1,
      data: error,
    });
  }
};

export const UpsertProduct = async (req, res) => {
  try {
    console.log("Length:",req.body.selectedProduct.length);
    if (!req.body.selectedProduct) {
      throw new Error("Name property not found in request body");
    }

    
    const shopName = res.locals.shopify.session.shop;
    const shopTbl = await Shop.findOne({ where: { shop_domain: shopName } });

    let prodObj = req.body.selectedProduct.map((value, index) => {
      return {
        store_id: shopTbl.dataValues.store_id,
        product_id: value.id,
        title: value.title,
        handle: value.handle,
        image: value.image,
        minQty:value.minQty,
        maxQty:value.maxQty
      };
    });
    console.log("PROD OBJ >>> :",prodObj);
   let responseDB=await Product.bulkCreate(prodObj, {
      fields: ["store_id", "product_id", "title", "handle", "image","minQty","maxQty"],
      updateOnDuplicate: ["product_id","product_id", "title", "handle", "image","minQty","maxQty"],
    });

    console.log("RESPONSE DB >>>:",responseDB);
    res.status(200).send({
      msg: "Sucess while fetching Product data from api",
      status: 1,
      Newdata: { name: req.body.selectedProduct },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "Error while fetching product data",
      sucess: 1,
      data: error,
    });
  }
};
