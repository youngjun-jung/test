const oracledb = require('oracledb');
const logger = require('../../logger'); 
const dbConfig = require('../config/dbconfig');

// 프로시저 호출 함수
exports.callPlansalecntproc = async (year, scode, month_01, month_02, month_03, month_04, month_05, month_06, month_07, month_08, month_09, month_10, month_11, month_12, procid) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `BEGIN 
                SP_PLAN_SALES_CNT_PROC(:year, :scode, :month_01, :month_02, :month_03, :month_04, :month_05, :month_06, :month_07, :month_08, :month_09, :month_10, :month_11, :month_12, :procid, :returncode); 
            END;`,
            {
                year: year, // 매개변수
                scode: scode, // 매개변수
                month_01: month_01, // 매개변수
                month_02: month_02, // 매개변수
                month_03: month_03, // 매개변수
                month_04: month_04, // 매개변수
                month_05: month_05, // 매개변수
                month_06: month_06, // 매개변수
                month_07: month_07, // 매개변수
                month_08: month_08, // 매개변수
                month_09: month_09, // 매개변수
                month_10: month_10, // 매개변수
                month_11: month_11, // 매개변수
                month_12: month_12, // 매개변수
                procid: procid, // 매개변수
                returncode: { dir: oracledb.BIND_OUT, type: oracledb.CLOB } // 출력 매개변수
            }
        );

        // CLOB 데이터를 읽어와 JSON으로 변환
        const clob = result.outBinds.returncode;
        let jsonData = '';

        if (clob) {
            jsonData = await clob.getData(); // CLOB 데이터를 문자열로 변환
            clob.close(); // 리소스 해제
        }
        return JSON.parse(jsonData);
    } catch (err) {
        throw err;
    } finally {
        if (connection) {
          try {
            await connection.close(); // 연결 종료
          } catch (closeErr) {
            logger.error('DB 연결 종료 실패:', closeErr);
          }
        }
      }
};
