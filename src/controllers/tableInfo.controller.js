const { executeQuery } = require('../config/queries');
const logger = require('../../logger'); 

  // 테이블 정보 조회
exports.getTableInfo = async (req, res) => {
   const receivedData = req.query;

   const conditionType = receivedData.type;
   const conditionText = receivedData.text;
   const allowedType = ['TABLE_NAME', 'API_NAME', 'RELATED_PROCEDURE', 'INFO', 'ALL'];
   
   if(!allowedType.includes(conditionType)) {
        return res.status(400).json({ success: false, message: '유효하지 않은 검색 조건', error: '유효하지 않은 검색 조건' });
   }

   let query = `
    SELECT NUM, TABLE_NAME, API_NAME, RELATED_PROCEDURE, INFO, USE_YN
    FROM PLAN_TABLE_INFO
    WHERE 1=1`;

    const binds = {};
   
    if (conditionType && conditionType !== 'ALL' && conditionText) {
        query += ` 
        AND ${conditionType} LIKE :conditionText`;

        binds.conditionText = `%${conditionText}%`;
    }

    query += `  ORDER BY CASE
                            WHEN INFO IS NOT NULL THEN 0
                            ELSE 1
                        END, TABLE_NAME`;

    logger.info(`Binds: ${JSON.stringify(binds)}`);

    try {
        const data = await executeQuery(query, binds); // 데이터 조회
        res.json({ success: true, data }); // JSON 형식으로 응답
  
      } catch (err) {
        res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
      }
   
  };


