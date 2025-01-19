const oracledb = require('oracledb');

async function connectToDB() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: 'system', // DB 사용자 이름
      password: 'jyj1845811!', // DB 비밀번호
      connectString: 'localhost:1521/ORCL' // 호스트, 포트, 서비스 이름
    });

    console.log('Oracle DB 연결 성공!');
    
    // SQL 실행 예제
    const result = await connection.execute(`SELECT * FROM dba_free_space`);
    console.log(result.rows);
  } catch (err) {
    console.error('DB 연결 실패:', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('DB 연결 종료');
      } catch (err) {
        console.error('DB 종료 실패:', err);
      }
    }
  }
}

connectToDB();