const { executeQuery, executeQueryMany } = require('../config/queries');
//const executeProcedure = require('../procedures/plantotalfinal.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlantotalfinalchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);

  query = `SELECT A.YEAR, A.LNAME, A.MNAME, A.SNAME, A.SCODE, ROUND(B.MONTH_01, 2) MONTH_01, ROUND(B.MONTH_02, 2) MONTH_02, ROUND(B.MONTH_03, 2) MONTH_03
          , ROUND(B.MONTH_05, 2) MONTH_04, ROUND(B.MONTH_06, 2) MONTH_05, ROUND(B.MONTH_06, 2) MONTH_06
          , ROUND(B.MONTH_07, 2) MONTH_07, ROUND(B.MONTH_08, 2) MONTH_08, ROUND(B.MONTH_09, 2) MONTH_09
          , ROUND(B.MONTH_10, 2) MONTH_10, ROUND(B.MONTH_11, 2) MONTH_11, ROUND(B.MONTH_12, 2) MONTH_12
          , ROUND(B.MONTH_0, 2) MONTH_0
            FROM PLAN_TOTAL_FINAL_CODE A, PLAN_TOTAL_FINAL B
            WHERE A.SCODE = B.SCODE(+)
            AND A.YEAR = B.YEAR(+)
            AND A.YEAR = :year
            AND B.PROCID(+) = :procid
            ORDER BY A.IDX `; 

  binds = {year: year, procid: procid};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
