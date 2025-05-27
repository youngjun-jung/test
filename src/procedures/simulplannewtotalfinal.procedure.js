const oracledb = require('oracledb');
const logger = require('../../logger'); 
const dbConfig = require('../config/dbconfig');

// 프로시저 호출 함수
exports.callSimulplannewtotalfinalproc = async (year, zinc_cnt, pd_1, pd_2, pd_3, pd_4, pd_5, pd_6, pd_7, pd_8, pd_9, pd_10, pd_11, pd_12, type_gubun, gubun, procid) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `BEGIN 
                SP_SIMUL_PLAN_NEW_TOTAL_FINAL_PROC(:year, :zinc_cnt, :pd_1, :pd_2, :pd_3, :pd_4, :pd_5, :pd_6, :pd_7, :pd_8, :pd_9, :pd_10, :pd_11, :pd_12, :type_gubun, :gubun, :procid, :returncode); 
            END;`,
            {
                year: year, // 매개변수
                zinc_cnt: zinc_cnt, // 매개변수
                pd_1: pd_1, // 매개변수
                pd_2: pd_2, // 매개변수
                pd_3: pd_3, // 매개변수
                pd_4: pd_4, // 매개변수
                pd_5: pd_5, // 매개변수
                pd_6: pd_6, // 매개변수
                pd_7: pd_7, // 매개변수
                pd_8: pd_8, // 매개변수
                pd_9: pd_9, // 매개변수
                pd_10: pd_10, // 매개변수
                pd_11: pd_11, // 매개변수
                pd_12: pd_12, // 매개변수
                type_gubun: type_gubun, // 매개변수
                gubun: gubun, // 매개변수
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
