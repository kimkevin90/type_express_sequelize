import { Sequelize } from "sequelize";

const db = new Sequelize("test", "root", "", {
  host: "database-1.cf1oivjkvlpz.ap-northeast-2.rds.amazonaws.com",
  dialect: "mysql",
});

export default db;
