const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getYearbackupchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;

  console.log("year: ", year);

  query = `SELECT '3' GUBUN, BACKUP_ID, COMMENTS
          FROM PLAN_BACKUP
          WHERE BACKUP_ID LIKE 'BAC' || :year || '%'
          AND USE_YN = 'Z'
          UNION ALL 
          SELECT TO_CHAR(ROWNUM), BACKUP_ID, COMMENTS
          FROM (
                SELECT BACKUP_ID, COMMENTS
                FROM PLAN_BACKUP
                WHERE BACKUP_ID LIKE 'BAC' || :year || '%'
                AND USE_YN = 'Y'
                ORDER BY BACKUP_ID DESC
              )
          WHERE ROWNUM < 3
          ORDER BY GUBUN DESC`; 

  binds = {year: year};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
