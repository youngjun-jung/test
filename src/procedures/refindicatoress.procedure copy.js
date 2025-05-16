const oracledb = require('oracledb');
const logger = require('../../logger'); 
const { getConnection, closeConnection } = require('../config/dbConnection'); // 풀 커넥션 모듈 import

// 프로시저 호출 함수
exports.callRefindicatoressproc = async (year, type_gubun) => {
    let connection;
    try {
        connection = await getConnection(); // 풀에서 커넥션 획득

        const result = await connection.execute(
            `BEGIN 
                SP_PLAN_TYPE_GUBUN_PROC(:year, :type_gubun, :returncode); 
            END;`,
            {
                year: year,
                type_gubun: type_gubun,
                returncode: { dir: oracledb.BIND_OUT, type: oracledb.CLOB }
            }
        );

        // CLOB 데이터 처리
        const clob = result.outBinds.returncode;
        let jsonData = '';

        if (clob) {
            jsonData = await clob.getData();
            clob.close();
        }
        return JSON.parse(jsonData);
    } catch (err) {
        logger.error('프로시저 실행 오류:', err); // 오류 로깅 추가
        throw err;
    } finally {
        await closeConnection(connection); // 풀에 커넥션 반환
    }
};
