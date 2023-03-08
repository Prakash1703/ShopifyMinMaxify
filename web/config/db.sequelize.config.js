import { Sequelize } from "sequelize";

//Configuration to DB
const SequelizeInstance = new Sequelize("shopifydemo", "root", "", {
  host: "localhost",
  dialect: "mysql", // or 'postgres', 'sqlite', etc.
});

//Connection to DB
SequelizeInstance
  .sync({ force: false })
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

export default SequelizeInstance;
