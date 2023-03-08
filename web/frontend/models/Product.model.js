import { DataTypes } from "sequelize";
import SequelizeInstance from "../../config/db.sequelize.config.js";

const Product = SequelizeInstance.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    store_id: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    handle: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    minQty: {
      type: DataTypes.STRING,
    },
    maxQty: {
      type: DataTypes.STRING,
    },
    published:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    allowNull:true
  }
);

export default Product;
