const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/products.procedure');
const logger = require('../../logger'); 

  // 참조 관련 비즈니스 로직
exports.getProductschk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;

  console.log("year: ", year);

  // 프로시저 호출
  const data1 = await executeProcedure.callProductsproc(year);

  logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

  if (!data1 || Object.keys(data1).length === 0) {
    res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
  }

  const query = `SELECT X.YEAR, NAME_1, LNAME_1, MNAME_1, SNAME_1, LNAME_2, MNAME_2, SNAME_2
                , MONTH_01, MONTH_02, MONTH_03, MONTH_04, MONTH_05, MONTH_06, MONTH_07, MONTH_08, MONTH_09, MONTH_10, MONTH_11, MONTH_12
                FROM (SELECT A.YEAR, A.SCODE SCODE_1, B.SCODE SCODE_2, NAME NAME_1, A.LNAME LNAME_1
                      , B.LNAME LNAME_2, A.MNAME MNAME_1, B.MNAME MNAME_2, A.SNAME SNAME_1, B.SNAME SNAME_2 
                      , A.IDX IDX_1, B.IDX IDX_2 
                      FROM PLAN_PRODUCTS_CODE A
                      , PLAN_PRODUCTS_DIV_CODE B
                      WHERE A.PLAN = 'Y'
                      ) X
                      , PLAN_PRODUCTS A
                WHERE X.YEAR = A.YEAR(+)
                AND X.SCODE_1 = A.SCODE_1(+)
                AND X.SCODE_2 = A.SCODE_2(+)
                AND X.YEAR = :year
                ORDER BY IDX_1, IDX_2`;                 

 const binds = {year: year};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
