// connection.js
const oracledb = require('oracledb');
const { initializePool } = require('./dbconfig');
const logger = require('../../logger');

// 풀 초기화
initializePool();

async function getConnection() {
  try {
    const connection = await oracledb.getConnection();
    logger.info("오라클 커넥션 획득");
    return connection;
  } catch (err) {
    logger.error("커넥션 획득 실패:", err);
    throw err;
  }
}

async function closeConnection(connection) {
  if (connection) {
    try {
      await connection.close();
      logger.info("커넥션 반환 완료");
    } catch (err) {
      logger.error("커넥션 반환 실패:", err);
    }
  }
}

module.exports = { getConnection, closeConnection };