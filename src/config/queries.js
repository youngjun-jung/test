const oracledb = require('oracledb');
const dbConfig = require('./dbconfig');

let connection;

async function executeQuery(query, params = []) {
  let connection;  
  
  try {
    connection = await oracledb.getConnection(dbConfig);

    console.log(`connection: ${connection}`);
    console.log(`start execute: ${query}`);
    const result = await connection.execute(query, params, { outFormat: oracledb.OUT_FORMAT_OBJECT });
    console.log(JSON.stringify(result.rows, null, 2));
    // 결과 반환 (JSON 형태로 변환)
    return result.rows;  
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  }finally {
    if (connection) {
      try {
        await connection.close(); // 연결 종료
      } catch (closeErr) {
        console.error('DB 연결 종료 실패:', closeErr);
      }
    }
  }
}

module.exports = { executeQuery };
