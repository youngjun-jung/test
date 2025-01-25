const express = require('express');
const oracledb = require('oracledb');

//npm install oracledb - env 파일 읽기기
require('dotenv').config();

const oracleUser = process.env.ORACLE_USER;
const oraclePassword = process.env.ORACLE_PASSWORD;
const connectString = process.env.ORACLE_CONNECT_STRING;

console.log(`Oracle User: ${oracleUser}`);
console.log(`Oracle Password: ${oraclePassword}`);
console.log(`connectString: ${connectString}`);

const app = express();
const PORT = 3000;

// Oracle DB 설정
const dbConfig = {
    user: oracleUser, // DB 사용자 이름
    password: oraclePassword, // DB 비밀번호
    connectString: connectString // 호스트, 포트, 서비스 이름
};

// 데이터 조회 함수
async function fetchData(query, binds = []) {
  let connection;
  try {
    // Oracle DB 연결
    connection = await oracledb.getConnection(dbConfig);

    // 쿼리 실행
    const result = await connection.execute(query, binds, { outFormat: oracledb.OUT_FORMAT_OBJECT });

    // 결과 반환 (JSON 형태로 변환)
    return result.rows;
  } catch (err) {
    console.error('쿼리 실행 실패:', err);
    throw err; // 에러를 호출한 곳으로 전달
  } finally {
    if (connection) {
      try {
        await connection.close(); // 연결 종료
      } catch (closeErr) {
        console.error('DB 연결 종료 실패:', closeErr);
      }
    }
  }
}

// API 엔드포인트 정의
app.get('/', async (req, res) => {
  //const query = 'SELECT * FROM T_JOB WHERE tablespace_name = :id';
 // const binds = ['SYSTEM']; // 클라이언트에서 id를 쿼리 파라미터로 받음

 const query = 'SELECT * FROM T_JOB';
 const binds = [];

  try {
    const data = await fetchData(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답
  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
});

app.get('/user', async (req, res) => {
    //const query = 'SELECT * FROM T_JOB WHERE tablespace_name = :id';
   // const binds = ['SYSTEM']; // 클라이언트에서 id를 쿼리 파라미터로 받음
  
   const query = 'SELECT userid, username, passwd FROM adm_user';
   const binds = [];
  
    try {
      const data = await fetchData(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답
    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  });

// API 엔드포인트 정의
app.post('/', async (req, res) => {
    //const query = 'SELECT * FROM T_JOB WHERE tablespace_name = :id';
   // const binds = ['SYSTEM']; // 클라이언트에서 id를 쿼리 파라미터로 받음
  
   const query = 'SELECT * FROM T_JOB';
   const binds = [];
  
    try {
      const data = await fetchData(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답
    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  });

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});