const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/laborcostaia.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getLaborcostaiachk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const gubun = receivedData.gubun;

  console.log("year: ", year);
  console.log("gubun: ", gubun);
/*
  // 프로시저 호출
  const data1 = await executeProcedure.callLaborcostaiaproc(year);

  logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

  if (!data1 || Object.keys(data1).length === 0) {
    res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
  }
*/
  if(gubun != '0')
    {
        query = `SELECT YEAR, MONTH, NAME, XA, XB, XC, XD, XE, XF, XG, XH, ZN, XI, XJ, XK, XL, XM, XN, NUM
                FROM PLAN_LABOR_COST_AIA
                WHERE YEAR = :year
                ORDER BY NUM`;  
                      
        binds = {year: year};              
    }
    else
    {
        query = `SELECT A.YEAR, '전체' MONTH, A.NAME, SUM(XA) XA, SUM(XB) XB, SUM(XC) XC, SUM(XD) XD, SUM(XE) XE, SUM(XF) XF, SUM(XG) XG
                , SUM(XH) XH, SUM(ZN) ZN, SUM(XI) XI, SUM(XJ) XJ, SUM(XK) XK, SUM(XL) XL, SUM(XM) XM, SUM(XN) XN, B.IDX NUM
                FROM PLAN_LABOR_COST_AIA A, PLAN_LABOR_COST_CODE B
                WHERE A.YEAR = :year
                AND A.NAME = B.SNAME(+)
                AND A.YEAR = B.YEAR(+)
                GROUP BY A.YEAR, A.NAME, B.IDX
                ORDER BY B.IDX`;  
  
        binds = {year: year};                 
    }           
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
