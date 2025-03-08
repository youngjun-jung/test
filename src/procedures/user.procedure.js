const oracledb = require('oracledb');
const logger = require('../../logger'); 
const dbConfig = require('../config/dbconfig');

// 프로시저 호출 함수
exports.callUserproc = async (gubun, userid, username, passwd, groupid) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `BEGIN 
                sp_user_proc(:gubun, :userid, :username, :groupid, :passwd, :returncode); 
            END;`,
            {
              gubun: gubun, // gubun 매개변수
              userid: userid, // userid 매개변수
              username: username, // username 매개변수
              groupid: groupid, // groupid 매개변수
              passwd: passwd, // passwd 매개변수
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
