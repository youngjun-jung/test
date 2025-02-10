const { executeQuery } = require('../config/queries');
const logger = require('../../logger'); 

  // 사용자 조회 로직
exports.getfile = async (req, res) => {
 
   const receivedData = req.query;

   const fileid = receivedData.fileid;

   const query = `SELECT GUBUN, FILEID,FILESIZE,VER,CREATED_DT,MODIFIED_DT,ACCESSED_DT
                  FROM TB_UPDATE_YP
                  WHERE FILEID LIKE :fileid
                  ORDER BY FILEID`;

  const binds = {fileid: fileid};
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };
