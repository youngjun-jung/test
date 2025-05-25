const { executeQuery } = require('../config/queries');
const logger = require('../../logger'); 

  // 버전 조회 로직
exports.getCurrentVersion = async (req, res) => {
   const receivedData = req.query;

   const appVer = receivedData.appver;

   const query = `SELECT RDATE, APPVER, RLEVEL, RTITLE, COMMENTS
                    FROM TB_UPDATE_YP_MGMT A
                   WHERE TO_NUMBER(REPLACE(APPVER, '.', '')) = (
                        SELECT MAX(TO_NUMBER(REPLACE(APPVER, '.', '')))
                          FROM TB_UPDATE_YP_MGMT B )`;

  const binds = { };
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답
    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };


