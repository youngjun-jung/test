const express = require('express')
const oracledb = require('oracledb');
const app = express()
const port = 3000

// Oracle DB 설정 정보
const dbConfig = {
    user: 'system', // DB 사용자 이름
    password: 'jyj1845811!', // DB 비밀번호
    connectString: 'localhost:1521/ORCL' // 호스트, 포트, 서비스 이름
  };
  
  /**
   * Oracle DB 연결 함수
   * @returns {Promise<object>} - Oracle Connection 객체 반환
   */
  async function getOracleConnection() {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      console.log('Oracle DB 연결 성공!');
      return connection;
    } catch (err) {
      console.error('Oracle DB 연결 실패:', err);
      throw err;
    }
  }

  async function executeQuery(query, binds = []) {
    let connection;
    try {
      connection = await getOracleConnection();
      const result = await connection.execute(query, binds, { autoCommit: true });
      console.log(result.rows);
      return result;
    } catch (err) {
      console.error('쿼리 실행 중 오류 발생:', err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
          console.log('DB 연결 종료');
        } catch (closeErr) {
          console.error('DB 연결 종료 실패:', closeErr);
        }
      }
    }
  }


  app.get('/', (req, res) => {
    const query = 'SELECT * FROM dba_free_space WHERE tablespace_name = :id';
    const binds = ['SYSTEM'];  // 클라이언트에서 id를 쿼리 파라미터로 받음
  
    try {
      const data =  executeQuery(query, binds); // 데이터 조회
      console.log(data.rows);
      res.json(data); // JSON 형식으로 응답
    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  });

app.get('/sound/:name', (req, res) => {
    const { name } = req.params;

    console.log(name)

    if(name == "dog") {
         res.json({'sound':'멍멍멍'})
     } else if(name == "cat") {
     res.json({'sound':'야옹'})
     } else {
         res.json({'sound':'기타'})
     }
  })

  app.get('/user/:id', (req, res) => {
    const p = req.params;
    console.log(p)
    const q = req.query;
    console.log(q)

    res.json({'userid': q.a})
  })

  app.post('/user/:id', (req, res) => {
    const p = req.params;
    console.log(p)
    const q = req.body;
    console.log(q)

    res.json({'userid': q.a})
  })

  app.get('/cat', (req, res) => {
    res.send('고양이')
  })

  app.get('/dog', (req, res) => {
    res.send('<h>강아지</h>')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})