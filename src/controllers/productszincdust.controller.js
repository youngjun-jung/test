const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/productszinc.procedure');
const logger = require('../../logger'); 

  // 참조 관련 비즈니스 로직
exports.getProductszincdustchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;

  console.log("year: ", year);

  // 프로시저 호출
    const data1 = await executeProcedure.callProductszincproc(year);

    logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

    if (!data1 || Object.keys(data1).length === 0) {
      res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
    }

  const query = `SELECT LNAME, MNAME, SNAME, MEASURE, B.WON_CNT, B.WON_AMT, B.CNT, B.UNIT_COST, B.AMT
                FROM PLAN_PRODUCTS_CODE A, PLAN_PRODUCTS_ZINC_DUST B
                WHERE A.SCODE = B.SCODE(+)
                AND A.YEAR = B.YEAR(+)
                AND A.YEAR = :year
                AND A.ZINC_DUST = 'Y'
                ORDER BY A.IDX`;                 

 const binds = {year: year};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
