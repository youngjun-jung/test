const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/productszinc.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getProductsmonthelcopperchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const month = receivedData.month;

  console.log("year: ", year);
  console.log("month: ", month);
/*
  // 프로시저 호출
    const data1 = await executeProcedure.callProductszincproc(year);

    logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

    if (!data1 || Object.keys(data1).length === 0) {
      res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
    }
*/

  const query = `SELECT LNAME, MNAME, SNAME, MEASURE, SUM(B.WON_CNT) WON_CNT, SUM(B.WON_AMT) WON_AMT, SUM(B.CNT) CNT, DECODE(SUM(B.CNT), 0, 0, SUM(B.AMT)/SUM(B.CNT) * 1000) UNIT_COST, SUM(B.AMT) AMT
                    FROM PLAN_PRODUCTS_CODE A, PLAN_PRODUCTS_MONTH_ELCOPPER B
                    WHERE A.SCODE = B.SCODE(+)
                    AND A.YEAR = B.YEAR(+)
                    AND A.YEAR = :year
                    AND B.MONTH = :month
                    AND A.ELCOPPER = 'Y'
                    GROUP BY LNAME, MNAME, SNAME, MEASURE, A.IDX
                    ORDER BY A.IDX`;                 

  const binds = {year: year, month: month};  

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
