import Shop from "../frontend/models/Shop.model.js";
import shopify from "../shopify.js";
export const CustomerSync = async (req, res) => {
  try {
    const shopName = res.locals.shopify.session.shop;
    const shopTbl = await Shop.findOne({ where: { shop_domain: shopName } });

    if (!shopTbl) {
      const shopDetails = await shopify.api.rest.Shop.all({
        session: res.locals.shopify.session,
      });

      const [shop, created] = await Shop.upsert({
        store_id: shopDetails[0].id,
        name: shopDetails[0].name,
        email: shopDetails[0].email,
        currency: shopDetails[0].currency,
        shop_domain: shopDetails[0].myshopify_domain,
        shop_created_at: shopDetails[0].created_at,
        shop_owner: shopDetails[0].shop_owner,
        plan_name: shopDetails[0].plan_name,
        is_paid: false,
        timestamps: false,
      });
    }
    res
      .status(200)
      .send({ msg: "Shop sync started...", sucess: 1, data: shopTbl });
  } catch (error) {
    res.status(500).send({
      msg: "Error querying data from database",
      sucess: 0,
      error: error,
    });
  }
};

export const GetShopDetails = async (req, res) => {
  try {
    const shopName = res.locals.shopify.session.shop;
    const shopTbl = await Shop.findOne({ where: { shop_domain: shopName } });
    res
      .status(200)
      .send({
        msg: "Sucess while fetching shop data",
        sucess: 1,
        data: shopTbl,
      });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Error while fetching shop data", sucess: 1, data: error });
  }
};
