const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/productioninputs.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getProductioninputschk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);
/*
   // 프로시저 호출
   const data1 = await executeProcedure.callProductioninputsproc(year, procid);

   logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);
 
   if (!data1 || Object.keys(data1).length === 0) {
     res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
   }
*/
  const query = `SELECT X.YEAR, LNAME, MNAME, SNAME, MEASURE, WEIGHT, UNIT_COST
                , MONTH_01 + MONTH_02 + MONTH_03 + MONTH_04 + MONTH_05 + MONTH_06 + MONTH_07 + MONTH_08 + MONTH_09 + MONTH_10 + MONTH_11 + MONTH_12 MONTH_0
                , MONTH_01
                , MONTH_02
                , MONTH_03
                , MONTH_01 + MONTH_02 + MONTH_03 MONTH_1
                , MONTH_04
                , MONTH_05
                , MONTH_06
                , MONTH_04 + MONTH_05 + MONTH_06 MONTH_2
                , MONTH_07
                , MONTH_08
                , MONTH_09
                , MONTH_07 + MONTH_08 + MONTH_09 MONTH_3
                , MONTH_10
                , MONTH_11
                , MONTH_12
                , MONTH_10 + MONTH_11 + MONTH_12 MONTH_4
                FROM PLAN_PRODUCTION_INPUTS_CODE X, PLAN_PRODUCTION_INPUTS A
                WHERE X.YEAR = A.YEAR(+)
                AND X.SCODE = A.SCODE(+)
                AND X.YEAR = :year
                AND A.PROCID(+) = :procid
                ORDER BY X.IDX`;                 

   const binds = {year: year, procid: procid};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
