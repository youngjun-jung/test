const { executeQuery } = require('../config/queries');

  // 파일 업데이트 비즈니스 로직
exports.getUpdate = async (req, res) => {
 
   const query = 'select userid, username, passwd FROM adm_user';
   const binds = [];
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };

   // 파일 업데이트 비즈니스 로직
exports.postUpdate = async (req, res) => {
 
  const query = 'select userid, username, passwd FROM adm_user';
  const binds = [];
 
   try {
     const data = await executeQuery(query, binds); // 데이터 조회
     res.json({ success: true, data }); // JSON 형식으로 응답

   } catch (err) {
     res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
   }
 };
