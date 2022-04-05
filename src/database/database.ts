import { Sequelize } from "sequelize";
import path from "path";
import Umzug from "umzug";

let database = process.env.MYSQL_DATABASE;
let user = process.env.MYSQL_USER;

const sequelize = new Sequelize(
  `${database}`,
  `${user}`,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
    logging: false,
  }
);

const umzug = new Umzug({
  migrations: {
    path: path.join(__dirname, "./migrations"),
    params: [sequelize.getQueryInterface()],
  },
  storage: "sequelize",
  storageOptions: {
    sequelize: sequelize,
  },
});

(async () => {
  await umzug.up();
  console.log("All migrations performed successfully");
})();

export { sequelize };
