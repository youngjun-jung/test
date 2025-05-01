const oracledb = require('oracledb');
const logger = require('../../logger'); 
const dbConfig = require('../config/dbconfig');

// 프로시저 호출 함수
exports.callElecrectifiercostproc = async (year, cost1, cost2, cost3, cost4, cost5, cost6, cost7, cost8, cost9, cost10, cost11, cost12, cost13) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `BEGIN 
                SP_PLAN_ELEC_COST_UPDATE(:year, :cost1, :cost2, :cost3, :cost4, :cost5, :cost6, :cost7, :cost8, :cost9, :cost10, :cost11, :cost12, :cost13, :returncode); 
            END;`,
            {
                year: year, // 매개변수
                cost1: cost1, // 매개변수
                cost2: cost2, // 매개변수
                cost3: cost3, // 매개변수
                cost4: cost4, // 매개변수
                cost5: cost5, // 매개변수
                cost6: cost6, // 매개변수
                cost7: cost7, // 매개변수
                cost8: cost8, // 매개변수
                cost9: cost9, // 매개변수
                cost10: cost10, // 매개변수
                cost11: cost11, // 매개변수
                cost12: cost12, // 매개변수
                cost13: cost13, // 매개변수
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
