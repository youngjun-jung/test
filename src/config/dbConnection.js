const oracledb = require('oracledb');
const dbConfig = require('./dbconfig');
const logger = require('../../logger'); 

let connection;

async function getConnection() {
  if (!connection) {
    connection = await oracledb.getConnection(dbConfig);
    logger.info("Oracle DB connected!");
  }
  return connection;
}

async function closeConnection() {
  if (connection) {
    logger.info("[start]Oracle DB connection closed!");
    await connection.close();
    logger.info("[end]Oracle DB connection closed!");
  }
}

module.exports = { getConnection, closeConnection };
