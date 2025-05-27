const { executeQuery } = require('../config/queries');
const logger = require('../../logger'); 

  // 버전 조회 로직
exports.getCurrentVersion = async (req, res) => {
   const receivedData = req.query;

   const appVer = receivedData.appver;

   const query = `SELECT RVERSION, RTITLE, RCOMMENTS, RIDX
                  FROM (
                    SELECT RVERSION, RTITLE, RCOMMENTS, RIDX,
                            ROW_NUMBER() OVER (ORDER BY
                                LPAD(REGEXP_SUBSTR(RVERSION, '[^.]+', 1, 1), 3, '0') DESC,
                                LPAD(REGEXP_SUBSTR(RVERSION, '[^.]+', 1, 2), 3, '0') DESC,
                                LPAD(REGEXP_SUBSTR(RVERSION, '[^.]+', 1, 3), 3, '0') DESC,
                                RIDX DESC
                            ) as RN
                      FROM TB_UPDATE_YP_MGMT
                  )
                  WHERE RN = 1`;

  const binds = { };
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답
    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };


