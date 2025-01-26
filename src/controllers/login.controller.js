const { executeQuery } = require('../config/queries');

// 로그인 관련 비즈니스 로직
exports.getLoginchk = async (req, res) => {
     //const query = 'SELECT * FROM T_JOB WHERE tablespace_name = :id';
   // const binds = ['SYSTEM']; // 클라이언트에서 id를 쿼리 파라미터로 받음
  
   const query = 'SELECT userid, username, passwd FROM adm_user where rownum = 1';
   const binds = [];
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };
  
