const oracledb = require('oracledb');
const logger = require('../../logger'); 
const dbConfig = require('../config/dbconfig');

// 프로시저 호출 함수
exports.callProcnewproc = async (year, procid, zin_in, zin_lo, zin_out, zin_out_in, s_in, s_dong, s_on, scode, zinc_trans, ca_trans, comments, sale_choice) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `BEGIN 
                SP_PROC_NEW2(:year, :procid, :zin_in, :zin_lo, :zin_out, :zin_out_in, :s_in, :s_dong, :s_on, :scode, :zinc_trans, :ca_trans, :comments, :sale_choice, :returncode); 
            END;`,
            {
                year: year, // 매개변수
                procid: procid, // 매개변수
                zin_in: zin_in, // 매개변수
                zin_lo: zin_lo, // 매개변수
                zin_out: zin_out, // 매개변수
                zin_out_in: zin_out_in, // 매개변수
                s_in: s_in, // 매개변수
                s_dong: s_dong, // 매개변수
                s_on: s_on, // 매개변수
                scode: scode, // 매개변수
                zinc_trans: zinc_trans, // 매개변수
                ca_trans: ca_trans, // 매개변수
                comments: comments, // 매개변수
                sale_choice: sale_choice, // 매개변수
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
