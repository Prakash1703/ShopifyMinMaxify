import { DataTypes } from "sequelize";
import SequelizeInstance from "../../config/db.sequelize.config.js";

const Shop = SequelizeInstance.define(
  "Shop",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    store_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
    },
    shop_domain: {
      type: DataTypes.STRING,
    },
    shop_created_at: {
      type: DataTypes.STRING,
    },
    shop_owner: {
      type: DataTypes.STRING,
    },
    iana_timezone: {
      type: DataTypes.STRING,
    },
    plan_name: {
      type: DataTypes.STRING,
    },
    is_paid: {
      type: DataTypes.INTEGER,
    },
    is_new_user: {
      type: DataTypes.INTEGER,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export default Shop;
