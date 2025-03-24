const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/products.procedure');
const logger = require('../../logger'); 

  // 참조 관련 비즈니스 로직
exports.getProducts_dtlchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const month = receivedData.month;

  console.log("year: ", year);

  // 프로시저 호출
  const data1 = await executeProcedure.callProductsproc(year);

  logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

  if (!data1 || Object.keys(data1).length === 0) {
    res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
  }

  if (month='00') {
    const query = `SELECT YEAR||:month, NAME, LNAME, MNAME, SNAME, MEASURE
                  , SUM(DECODE(SCODE, 'DA0101', MONTH_01, 0)) DA0101
                  , SUM(DECODE(SCODE, 'DA0102', MONTH_01, 0)) DA0102
                  , SUM(DECODE(SCODE, 'DA0103', MONTH_01, 0)) DA0103
                  , SUM(DECODE(SCODE, 'DA0201', MONTH_01, 0)) DA0201
                  , SUM(DECODE(SCODE, 'DA0202', MONTH_01, 0)) DA0202
                  , SUM(DECODE(SCODE, 'DA0203', MONTH_01, 0)) DA0203
                  , SUM(DECODE(SCODE, 'DA0301', MONTH_01, 0)) DA0301
                  , SUM(DECODE(SCODE, 'DA0302', MONTH_01, 0)) DA0302
                  , SUM(DECODE(SCODE, 'DA0303', MONTH_01, 0)) DA0303
                  , SUM(DECODE(SCODE, 'DA0401', MONTH_01, 0)) DA0401
                  , SUM(DECODE(SCODE, 'DA0402', MONTH_01, 0)) DA0402
                  , SUM(DECODE(SCODE, 'DA0403', MONTH_01, 0)) DA0403
                  , SUM(DECODE(SCODE, 'DA0501', MONTH_01, 0)) DA0501
                  , SUM(DECODE(SCODE, 'DA0502', MONTH_01, 0)) DA0502
                  , SUM(DECODE(SCODE, 'DA0503', MONTH_01, 0)) DA0503
                  , SUM(DECODE(SCODE, 'DA0601', MONTH_01, 0)) DA0601
                  , SUM(DECODE(SCODE, 'DA0602', MONTH_01, 0)) DA0602
                  , SUM(DECODE(SCODE, 'DA0603', MONTH_01, 0)) DA0603
                  , SUM(DECODE(SCODE, 'DA0701', MONTH_01, 0)) DA0701
                  , SUM(DECODE(SCODE, 'DA0702', MONTH_01, 0)) DA0702
                  , SUM(DECODE(SCODE, 'DA0703', MONTH_01, 0)) DA0703
                  , SUM(DECODE(SCODE, 'DA0801', MONTH_01, 0)) DA0801
                  , SUM(DECODE(SCODE, 'DA0802', MONTH_01, 0)) DA0802
                  , SUM(DECODE(SCODE, 'DA0803', MONTH_01, 0)) DA0803
                  , SUM(DECODE(SCODE, 'DA0901', MONTH_01, 0)) DA0901
                  , SUM(DECODE(SCODE, 'DA0902', MONTH_01, 0)) DA0902
                  , SUM(DECODE(SCODE, 'DA0903', MONTH_01, 0)) DA0903
                  , SUM(DECODE(SCODE, 'DA1001', MONTH_01, 0)) DA1001
                  , SUM(DECODE(SCODE, 'DA1002', MONTH_01, 0)) DA1002
                  , SUM(DECODE(SCODE, 'DA1003', MONTH_01, 0)) DA1003
                  , SUM(DECODE(SCODE, 'DA1101', MONTH_01, 0)) DA1101
                  , SUM(DECODE(SCODE, 'DA1102', MONTH_01, 0)) DA1102
                  , SUM(DECODE(SCODE, 'DA1103', MONTH_01, 0)) DA1103
                  , SUM(DECODE(SCODE, 'DA1201', MONTH_01, 0)) DA1201
                  , SUM(DECODE(SCODE, 'DA1202', MONTH_01, 0)) DA1202
                  , SUM(DECODE(SCODE, 'DA1203', MONTH_01, 0)) DA1203
                  , SUM(DECODE(SCODE, 'DA1301', MONTH_01, 0)) DA1301
                  , SUM(DECODE(SCODE, 'DA1302', MONTH_01, 0)) DA1302
                  , SUM(DECODE(SCODE, 'DA1303', MONTH_01, 0)) DA1303
                  , SUM(DECODE(SCODE, 'DA1401', MONTH_01, 0)) DA1401
                  , SUM(DECODE(SCODE, 'DA1402', MONTH_01, 0)) DA1402
                  , SUM(DECODE(SCODE, 'DA1403', MONTH_01, 0)) DA1403
                  , SUM(DECODE(SCODE, 'DA1501', MONTH_01, 0)) DA1501
                  , SUM(DECODE(SCODE, 'DA1502', MONTH_01, 0)) DA1502
                  , SUM(DECODE(SCODE, 'DA1503', MONTH_01, 0)) DA1503
                  , SUM(DECODE(SCODE, 'DA1601', MONTH_01, 0)) DA1601
                  , SUM(DECODE(SCODE, 'DA1602', MONTH_01, 0)) DA1602
                  , SUM(DECODE(SCODE, 'DA1603', MONTH_01, 0)) DA1603
                  , SUM(DECODE(SCODE, 'DA1701', MONTH_01, 0)) DA1701
                  , SUM(DECODE(SCODE, 'DA1702', MONTH_01, 0)) DA1702
                  , SUM(DECODE(SCODE, 'DA1703', MONTH_01, 0)) DA1703
                  , SUM(DECODE(SCODE, 'DA1801', MONTH_01, 0)) DA1801
                  , SUM(DECODE(SCODE, 'DA1802', MONTH_01, 0)) DA1802
                  , SUM(DECODE(SCODE, 'DA1803', MONTH_01, 0)) DA1803
                  , SUM(DECODE(SCODE, 'DA1901', MONTH_01, 0)) DA1901
                  , SUM(DECODE(SCODE, 'DA1902', MONTH_01, 0)) DA1902
                  , SUM(DECODE(SCODE, 'DA1903', MONTH_01, 0)) DA1903
                  , SUM(DECODE(SCODE, 'DA2001', MONTH_01, 0)) DA2001
                  , SUM(DECODE(SCODE, 'DA2002', MONTH_01, 0)) DA2002
                  , SUM(DECODE(SCODE, 'DA2003', MONTH_01, 0)) DA2003
                  , SUM(DECODE(SCODE, 'DB0101', MONTH_01, 0)) DB0101
                  , SUM(DECODE(SCODE, 'DB0102', MONTH_01, 0)) DB0102
                  , SUM(DECODE(SCODE, 'DB0103', MONTH_01, 0)) DB0103
                  , SUM(DECODE(SCODE, 'DC0101', MONTH_01, 0)) DC0101
                  , SUM(DECODE(SCODE, 'DC0102', MONTH_01, 0)) DC0102
                  , SUM(DECODE(SCODE, 'DC0103', MONTH_01, 0)) DC0103
                  , SUM(DECODE(SCODE, 'DC0201', MONTH_01, 0)) DC0201
                  , SUM(DECODE(SCODE, 'DC0202', MONTH_01, 0)) DC0202
                  , SUM(DECODE(SCODE, 'DC0203', MONTH_01, 0)) DC0203
                  , SUM(DECODE(SCODE, 'DC0301', MONTH_01, 0)) DC0301
                  , SUM(DECODE(SCODE, 'DC0302', MONTH_01, 0)) DC0302
                  , SUM(DECODE(SCODE, 'DC0303', MONTH_01, 0)) DC0303
                  , SUM(DECODE(SCODE, 'DD0101', MONTH_01, 0)) DD0101
                  , SUM(DECODE(SCODE, 'DD0102', MONTH_01, 0)) DD0102
                  , SUM(DECODE(SCODE, 'DD0103', MONTH_01, 0)) DD0103
                  FROM (
                      SELECT X.YEAR, X.NAME, X.LNAME, X.MNAME, X.SNAME, X.MEASURE, P.SCODE, P.SNAME P_SNAME, A.SCODE_1 , A.SCODE_2 
                      , A.MONTH_01, A.MONTH_02, A.MONTH_03, A.MONTH_04, A.MONTH_05, A.MONTH_06
                      , A.MONTH_07, A.MONTH_08, A.MONTH_09, A.MONTH_10, A.MONTH_11, A.MONTH_12, X.IDX 
                      FROM PLAN_PRODUCTS_CODE X, PLAN_PRODUCTS A, PLAN_PRODUCTS_DIV_CODE P
                      WHERE X.SCODE = A.SCODE_1(+)
                      AND X.YEAR = A.YEAR(+)
                      AND A.SCODE_2 = P.SCODE
                      AND A.YEAR = P.YEAR
                      AND A.YEAR = :year
                      ORDER BY X.IDX, P.IDX
                      )
                  GROUP BY YEAR, NAME, LNAME, MNAME, SNAME, MEASURE, IDX    
                  ORDER BY IDX`;       
                  
  }
  else{

    const query = `SELECT YEAR||:month, NAME, LNAME, MNAME, SNAME, MEASURE
                  , SUM(DECODE(SCODE, 'DA0101', MONTH_` + month + `, 0)) DA0101
                  , SUM(DECODE(SCODE, 'DA0102', MONTH_` + month + `, 0)) DA0102
                  , SUM(DECODE(SCODE, 'DA0103', MONTH_` + month + `, 0)) DA0103
                  , SUM(DECODE(SCODE, 'DA0201', MONTH_` + month + `, 0)) DA0201
                  , SUM(DECODE(SCODE, 'DA0202', MONTH_` + month + `, 0)) DA0202
                  , SUM(DECODE(SCODE, 'DA0203', MONTH_` + month + `, 0)) DA0203
                  , SUM(DECODE(SCODE, 'DA0301', MONTH_` + month + `, 0)) DA0301
                  , SUM(DECODE(SCODE, 'DA0302', MONTH_` + month + `, 0)) DA0302
                  , SUM(DECODE(SCODE, 'DA0303', MONTH_` + month + `, 0)) DA0303
                  , SUM(DECODE(SCODE, 'DA0401', MONTH_` + month + `, 0)) DA0401
                  , SUM(DECODE(SCODE, 'DA0402', MONTH_` + month + `, 0)) DA0402
                  , SUM(DECODE(SCODE, 'DA0403', MONTH_` + month + `, 0)) DA0403
                  , SUM(DECODE(SCODE, 'DA0501', MONTH_` + month + `, 0)) DA0501
                  , SUM(DECODE(SCODE, 'DA0502', MONTH_` + month + `, 0)) DA0502
                  , SUM(DECODE(SCODE, 'DA0503', MONTH_` + month + `, 0)) DA0503
                  , SUM(DECODE(SCODE, 'DA0601', MONTH_` + month + `, 0)) DA0601
                  , SUM(DECODE(SCODE, 'DA0602', MONTH_` + month + `, 0)) DA0602
                  , SUM(DECODE(SCODE, 'DA0603', MONTH_` + month + `, 0)) DA0603
                  , SUM(DECODE(SCODE, 'DA0701', MONTH_` + month + `, 0)) DA0701
                  , SUM(DECODE(SCODE, 'DA0702', MONTH_` + month + `, 0)) DA0702
                  , SUM(DECODE(SCODE, 'DA0703', MONTH_` + month + `, 0)) DA0703
                  , SUM(DECODE(SCODE, 'DA0801', MONTH_` + month + `, 0)) DA0801
                  , SUM(DECODE(SCODE, 'DA0802', MONTH_` + month + `, 0)) DA0802
                  , SUM(DECODE(SCODE, 'DA0803', MONTH_` + month + `, 0)) DA0803
                  , SUM(DECODE(SCODE, 'DA0901', MONTH_` + month + `, 0)) DA0901
                  , SUM(DECODE(SCODE, 'DA0902', MONTH_` + month + `, 0)) DA0902
                  , SUM(DECODE(SCODE, 'DA0903', MONTH_` + month + `, 0)) DA0903
                  , SUM(DECODE(SCODE, 'DA1001', MONTH_` + month + `, 0)) DA1001
                  , SUM(DECODE(SCODE, 'DA1002', MONTH_` + month + `, 0)) DA1002
                  , SUM(DECODE(SCODE, 'DA1003', MONTH_` + month + `, 0)) DA1003
                  , SUM(DECODE(SCODE, 'DA1101', MONTH_` + month + `, 0)) DA1101
                  , SUM(DECODE(SCODE, 'DA1102', MONTH_` + month + `, 0)) DA1102
                  , SUM(DECODE(SCODE, 'DA1103', MONTH_` + month + `, 0)) DA1103
                  , SUM(DECODE(SCODE, 'DA1201', MONTH_` + month + `, 0)) DA1201
                  , SUM(DECODE(SCODE, 'DA1202', MONTH_` + month + `, 0)) DA1202
                  , SUM(DECODE(SCODE, 'DA1203', MONTH_` + month + `, 0)) DA1203
                  , SUM(DECODE(SCODE, 'DA1301', MONTH_` + month + `, 0)) DA1301
                  , SUM(DECODE(SCODE, 'DA1302', MONTH_` + month + `, 0)) DA1302
                  , SUM(DECODE(SCODE, 'DA1303', MONTH_` + month + `, 0)) DA1303
                  , SUM(DECODE(SCODE, 'DA1401', MONTH_` + month + `, 0)) DA1401
                  , SUM(DECODE(SCODE, 'DA1402', MONTH_` + month + `, 0)) DA1402
                  , SUM(DECODE(SCODE, 'DA1403', MONTH_` + month + `, 0)) DA1403
                  , SUM(DECODE(SCODE, 'DA1501', MONTH_` + month + `, 0)) DA1501
                  , SUM(DECODE(SCODE, 'DA1502', MONTH_` + month + `, 0)) DA1502
                  , SUM(DECODE(SCODE, 'DA1503', MONTH_` + month + `, 0)) DA1503
                  , SUM(DECODE(SCODE, 'DA1601', MONTH_` + month + `, 0)) DA1601
                  , SUM(DECODE(SCODE, 'DA1602', MONTH_` + month + `, 0)) DA1602
                  , SUM(DECODE(SCODE, 'DA1603', MONTH_` + month + `, 0)) DA1603
                  , SUM(DECODE(SCODE, 'DA1701', MONTH_` + month + `, 0)) DA1701
                  , SUM(DECODE(SCODE, 'DA1702', MONTH_` + month + `, 0)) DA1702
                  , SUM(DECODE(SCODE, 'DA1703', MONTH_` + month + `, 0)) DA1703
                  , SUM(DECODE(SCODE, 'DA1801', MONTH_` + month + `, 0)) DA1801
                  , SUM(DECODE(SCODE, 'DA1802', MONTH_` + month + `, 0)) DA1802
                  , SUM(DECODE(SCODE, 'DA1803', MONTH_` + month + `, 0)) DA1803
                  , SUM(DECODE(SCODE, 'DA1901', MONTH_` + month + `, 0)) DA1901
                  , SUM(DECODE(SCODE, 'DA1902', MONTH_` + month + `, 0)) DA1902
                  , SUM(DECODE(SCODE, 'DA1903', MONTH_` + month + `, 0)) DA1903
                  , SUM(DECODE(SCODE, 'DA2001', MONTH_` + month + `, 0)) DA2001
                  , SUM(DECODE(SCODE, 'DA2002', MONTH_` + month + `, 0)) DA2002
                  , SUM(DECODE(SCODE, 'DA2003', MONTH_` + month + `, 0)) DA2003
                  , SUM(DECODE(SCODE, 'DB0101', MONTH_` + month + `, 0)) DB0101
                  , SUM(DECODE(SCODE, 'DB0102', MONTH_` + month + `, 0)) DB0102
                  , SUM(DECODE(SCODE, 'DB0103', MONTH_` + month + `, 0)) DB0103
                  , SUM(DECODE(SCODE, 'DC0101', MONTH_` + month + `, 0)) DC0101
                  , SUM(DECODE(SCODE, 'DC0102', MONTH_` + month + `, 0)) DC0102
                  , SUM(DECODE(SCODE, 'DC0103', MONTH_` + month + `, 0)) DC0103
                  , SUM(DECODE(SCODE, 'DC0201', MONTH_` + month + `, 0)) DC0201
                  , SUM(DECODE(SCODE, 'DC0202', MONTH_` + month + `, 0)) DC0202
                  , SUM(DECODE(SCODE, 'DC0203', MONTH_` + month + `, 0)) DC0203
                  , SUM(DECODE(SCODE, 'DC0301', MONTH_` + month + `, 0)) DC0301
                  , SUM(DECODE(SCODE, 'DC0302', MONTH_` + month + `, 0)) DC0302
                  , SUM(DECODE(SCODE, 'DC0303', MONTH_` + month + `, 0)) DC0303
                  , SUM(DECODE(SCODE, 'DD0101', MONTH_` + month + `, 0)) DD0101
                  , SUM(DECODE(SCODE, 'DD0102', MONTH_` + month + `, 0)) DD0102
                  , SUM(DECODE(SCODE, 'DD0103', MONTH_` + month + `, 0)) DD0103
                  FROM (
                      SELECT X.YEAR, X.NAME, X.LNAME, X.MNAME, X.SNAME, X.MEASURE, P.SCODE, P.SNAME P_SNAME, A.SCODE_1 , A.SCODE_2 
                      , A.MONTH_01, A.MONTH_02, A.MONTH_03, A.MONTH_04, A.MONTH_05, A.MONTH_06
                      , A.MONTH_07, A.MONTH_08, A.MONTH_09, A.MONTH_10, A.MONTH_11, A.MONTH_12, X.IDX 
                      FROM PLAN_PRODUCTS_CODE X, PLAN_PRODUCTS A, PLAN_PRODUCTS_DIV_CODE P
                      WHERE X.SCODE = A.SCODE_1(+)
                      AND X.YEAR = A.YEAR(+)
                      AND A.SCODE_2 = P.SCODE
                      AND A.YEAR = P.YEAR
                      AND A.YEAR = :year
                      ORDER BY X.IDX, P.IDX
                      )
                  GROUP BY YEAR, NAME, LNAME, MNAME, SNAME, MEASURE, IDX    
                  ORDER BY IDX`;

  }

 const binds = {year: year, month: month};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
