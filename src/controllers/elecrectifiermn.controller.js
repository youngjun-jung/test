const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getElecrectifiermnchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);
 
  query = `SELECT SCODE, VALUE
            FROM PLAN_ELEC_RECTIFIER_MANUAL
            WHERE YEAR = :year
            AND SCODE IN ('PERM2024', 'PERM2023', 'PERM2022', 'PERM2014', 'PERM2013', 'PERM2012', 'PERM2004', 'PERM2003', 'PERM2002') 
            AND PROCID = :procid
            ORDER BY IDX`;

  binds = {year: year, procid: procid};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
