const oracledb = require('oracledb');
const logger = require('../../logger'); 
const dbConfig = require('../config/dbconfig');

// 프로시저 호출 함수
exports.callPlanmonthlyinventorymanualproc = async (year, zinc_cnt, zinc_dan, s_cnt, s_dan, sd_cnt, sd_dan, jun_cnt, jun_dan, ag_cnt, ag_dan, au_cnt, au_dan, sl_cnt, sl_dan, cu_cnt, cu_dan, self_cnt, self_dan, ca_cnt, ca_dan, jung_cnt, jung_dan, procid) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `BEGIN 
                SP_PLANNING_MONTHLY_INVENTORY_MANUAL_PROC(:year, :zinc_cnt, :zinc_dan, :s_cnt, :s_dan, :sd_cnt, :sd_dan, :jun_cnt, :jun_dan, :ag_cnt, :ag_dan, :au_cnt, :au_dan, :sl_cnt, :sl_dan, :cu_cnt, :cu_dan, :self_cnt, :self_dan, :ca_cnt, :ca_dan, :procid, :jung_cnt, :jung_dan, :returncode); 
            END;`,
            {
                year: year, // 매개변수
                zinc_cnt: zinc_cnt, // 매개변수
                zinc_dan: zinc_dan, // 매개변수
                s_cnt: s_cnt, // 매개변수
                s_dan: s_dan, // 매개변수
                sd_cnt: sd_cnt, // 매개변수
                sd_dan: sd_dan, // 매개변수
                jun_cnt: jun_cnt, // 매개변수
                jun_dan: jun_dan, // 매개변수
                ag_cnt: ag_cnt, // 매개변수
                ag_dan: ag_dan, // 매개변수
                au_cnt: au_cnt, // 매개변수
                au_dan: au_dan, // 매개변수
                sl_cnt: sl_cnt, // 매개변수
                sl_dan: sl_dan, // 매개변수
                cu_cnt: cu_cnt, // 매개변수
                cu_dan: cu_dan, // 매개변수
                self_cnt: self_cnt, // 매개변수
                self_dan: self_dan, // 매개변수
                ca_cnt: ca_cnt, // 매개변수
                ca_dan: ca_dan, // 매개변수
                jung_cnt: jung_cnt, // 매개변수
                jung_dan: jung_dan, // 매개변수
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
