const oracledb = require('oracledb');
const logger = require('../../logger'); 
const dbConfig = require('./dbconfig');

let connection;

async function executeQuery(query, params = []) {
  let connection;  
  
  try {
    connection = await oracledb.getConnection(dbConfig);

    logger.info(`start execute: ${query}`);
    const result = await connection.execute(query, params, { autoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
    //logger.info(JSON.stringify(result.rows, null, 2));

    //logger.info(`result: ${result}`);

    // 결과 반환 (JSON 형태로 변환)
    return result.rows;  
  } catch (err) {
    logger.error("Error executing query:", err);
    throw err;
  }finally {
    if (connection) {
      try {
        await connection.close(); // 연결 종료
      } catch (closeErr) {
        logger.error('DB 연결 종료 실패:', closeErr);
      }
    }
  }
}

async function executeQueryMany(query, params = []) {
  let connection;  
  
  try {
    connection = await oracledb.getConnection(dbConfig);

    logger.info(`start execute: ${query}`);
    const result = await connection.executeMany(query, params, { autoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT });
    //logger.info(JSON.stringify(result, null, 2));

    // 결과 반환 (JSON 형태로 변환)
    return result.rows;  
  } catch (err) {
    logger.error("Error executing query:", err);
    throw err;
  }finally {
    if (connection) {
      try {
        await connection.close(); // 연결 종료
      } catch (closeErr) {
        logger.error('DB 연결 종료 실패:', closeErr);
      }
    }
  }
}

module.exports = { executeQuery, executeQueryMany };
