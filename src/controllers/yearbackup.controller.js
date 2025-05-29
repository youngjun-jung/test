const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getYearbackupchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);

  query = `SELECT TO_CHAR(ROWNUM) GUBUN, BACKUP_ID, '(' || SUBSTR(TIMEMARK, 1, 8) || ') ' || COMMENTS COMMENTS
          FROM (
                SELECT BACKUP_ID, COMMENTS, TIMEMARK
                FROM PLAN_BACKUP
                WHERE BACKUP_ID LIKE 'BAC' || :year || '%'
                AND USE_YN = 'Y'
                AND PROCID LIKE DECODE(:procid, 'ahs2024', '%', 'jminzzang', '%', :procid)
                ORDER BY BACKUP_ID DESC
              )
          WHERE ROWNUM < 6
          ORDER BY TO_CHAR(ROWNUM) DESC`; 

  binds = {year: year, procid: procid};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
