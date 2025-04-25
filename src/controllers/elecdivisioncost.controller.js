const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/elecdivisioncost.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getElecdivisioncostchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const gubun = receivedData.gubun;

  console.log("year: ", year);
  console.log("gubun: ", gubun);
/*
  // 프로시저 호출
  const data1 = await executeProcedure.callElecdivisioncostproc(year);

  logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

  if (!data1 || Object.keys(data1).length === 0) {
    res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
  }
*/
  query = `SELECT A.YEAR, A.SNAME, XSUM, XA, XB, XC
          FROM PLAN_ELEC_DIVISION_COST_CODE A, PLAN_ELEC_DIVISION_COST B
          WHERE A.SCODE = B.SCODE(+)
          AND A.YEAR = B.YEAR(+)
          AND A.YEAR = :year         
          AND B.GUBUN(+) = :gubun
          ORDER BY A.IDX`; 

  binds = {year: year, gubun: gubun};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
