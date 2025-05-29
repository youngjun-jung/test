const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getBackuplistchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;
  const todate = receivedData.date;

  console.log("year: ", year);
  console.log("procid: ", procid);
  console.log("todate: ", todate);

  const query = `SELECT BACKUP_ID, '(' || SUBSTR(TIMEMARK, 1, 8) || ') ' || COMMENTS COMMENTS, PROCID
                FROM PLAN_BACKUP
                WHERE BACKUP_ID LIKE '%' || :year || '%'
                AND USE_YN IN ('Z', 'Y')
                AND PROCID LIKE (SELECT DECODE(GUBUN1, 'Y', '%', :procid) FROM ADM_USER WHERE USERID = :procid)
                AND (TIMEMARK LIKE :todate || '%' OR TIMEMARK BETWEEN TO_CHAR(TO_DATE(:todate, 'YYYYMMDD') - 15, 'YYYYMMDD')||'000000' AND :todate || '999999')
                ORDER BY BACKUP_ID DESC`;                 

 const binds = {year: year, procid: procid, todate: todate};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
