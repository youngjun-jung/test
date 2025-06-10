const oracledb = require('oracledb');
const logger = require('../../logger'); 
const dbConfig = require('../config/dbconfig');

// 프로시저 호출 함수
exports.callPlanlossproc = async (year, month, zinccnt, zincamt, jungcnt, jungamt, socnt, soamt, cathcnt, cathamt, scnt, samt, cathscnt, cathsamt, procid) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `BEGIN 
                SP_PLAN_LOSS_UPDATE(:year, :month, :zinccnt, :zincamt, :jungcnt, :jungamt, :socnt, :soamt, :cathcnt, :cathamt, :scnt, :samt, :cathscnt, :cathsamt, :procid, :returncode); 
            END;`,
            {
                year: year, // 매개변수
                month: month, // 매개변수
                zinccnt: zinccnt, // 매개변수
                zincamt: zincamt, // 매개변수
                jungcnt: jungcnt, // 매개변수
                jungamt: jungamt, // 매개변수
                socnt: socnt, // 매개변수
                soamt: soamt, // 매개변수
                cathcnt: cathcnt, // 매개변수
                cathamt: cathamt, // 매개변수
                scnt: scnt, // 매개변수
                samt: samt, // 매개변수
                cathscnt: cathscnt, // 매개변수
                cathsamt: cathsamt, // 매개변수
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
