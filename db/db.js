import pg from "pg";

const userName = "staceyng";
const databaseName = "baby_app";

const pgConnectionConfigs = {
  user: userName,
  host: "localhost",
  database: databaseName,
  port: 5432,
};

const { Pool } = pg;
export const pool = new Pool(pgConnectionConfigs);
