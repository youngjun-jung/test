const oracledb = require('oracledb');
const dbConfig = require('./dbconfig');

let connection;

async function getConnection() {
  if (!connection) {
    connection = await oracledb.getConnection(dbConfig);
    console.log("Oracle DB connected!");
  }
  return connection;
}

async function closeConnection() {
  if (connection) {
    console.log("[start]Oracle DB connection closed!");
    await connection.close();
    console.log("[end]Oracle DB connection closed!");
  }
}

module.exports = { getConnection, closeConnection };
