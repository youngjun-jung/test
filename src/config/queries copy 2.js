const { getConnection, closeConnection } = require('./dbConnection');
const logger = require('../../logger');
const oracledb = require('oracledb');

async function executeQuery(query, params = []) {
  let connection;

  try {
    connection = await getConnection(); // 풀에서 커넥션 획득
    logger.info(`start execute: ${query}`);
    const result = await connection.execute(query, params, { autoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
    return result.rows;
  } catch (err) {
    logger.error("Error executing query:", err);
    throw err;
  } finally {
    await closeConnection(connection); // 커넥션 반환
  }
}


async function executeQueryMany(query, params = []) {
  let connection;

  try {
    connection = await getConnection();
    logger.info(`start execute: ${query}`);
    const result = await connection.executeMany(query, params, { autoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
    return result.rows;
  } catch (err) {
    logger.error("Error executing query:", err);
    throw err;
  } finally {
    await closeConnection(connection);
  }
}

module.exports = { executeQuery, executeQueryMany };
