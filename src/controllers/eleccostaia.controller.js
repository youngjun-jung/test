const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/eleccostaia.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getEleccostaiachk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const gubun = receivedData.gubun;

  console.log("year: ", year);
  console.log("gubun: ", gubun);
/*
  // 프로시저 호출
  const data1 = await executeProcedure.callEleccostaiaproc(year);

  logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

  if (!data1 || Object.keys(data1).length === 0) {
    res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
  }
*/
  if(gubun != '0')
    {
        query = `SELECT YEAR, MONTH, NAME, XA, XB, XC, XD, XE, XF, XG, XH, ZN, XI, XJ, XK, XL, XM, XN, NUM
                FROM PLAN_ELEC_COST_AIA
                WHERE YEAR = :year
                ORDER BY MONTH, NAME DESC`;  
                      
        binds = {year: year};              
    }
    else
    {
      query = `SELECT A.YEAR, '전체' MONTH, A.NAME, SUM(XA) XA, SUM(XB) XB, SUM(XC) XC, SUM(XD) XD, SUM(XE) XE, SUM(XF) XF, SUM(XG) XG
                , SUM(XH) XH, SUM(ZN) ZN, SUM(XI) XI, SUM(XJ) XJ, SUM(XK) XK, SUM(XL) XL, SUM(XM) XM, SUM(XN) XN, 1 IDX 
              FROM PLAN_ELEC_COST_AIA A, PLAN_ELEC_COST_CODE B
              WHERE A.YEAR = :year
                AND A.NAME = B.SNAME(+)
                AND A.YEAR = B.YEAR(+)
                AND B.SNAME = '수량'
              GROUP BY A.YEAR, A.NAME
              UNION ALL
              SELECT A.YEAR, '전체' MONTH, '단가' NAME
                , DECODE(SUM(DECODE(NAME, '수량', A.XA, 0)), 0, 0, SUM(DECODE(NAME, '금액', A.XA, 0)) / SUM(DECODE(NAME, '수량', A.XA, 0)) * 1000) XA
                , DECODE(SUM(DECODE(NAME, '수량', A.XB, 0)), 0, 0, SUM(DECODE(NAME, '금액', A.XB, 0)) / SUM(DECODE(NAME, '수량', A.XB, 0)) * 1000) XB
                , DECODE(SUM(DECODE(NAME, '수량', A.XC, 0)), 0, 0, SUM(DECODE(NAME, '금액', A.XC, 0)) / SUM(DECODE(NAME, '수량', A.XC, 0)) * 1000) XC
                , DECODE(SUM(DECODE(NAME, '수량', A.XD, 0)), 0, 0, SUM(DECODE(NAME, '금액', A.XD, 0)) / SUM(DECODE(NAME, '수량', A.XD, 0)) * 1000) XD
                , DECODE(SUM(DECODE(NAME, '수량', A.XE, 0)), 0, 0, SUM(DECODE(NAME, '금액', A.XE, 0)) / SUM(DECODE(NAME, '수량', A.XE, 0)) * 1000) XE
                , DECODE(SUM(DECODE(NAME, '수량', A.XF, 0)), 0, 0, SUM(DECODE(NAME, '금액', A.XF, 0)) / SUM(DECODE(NAME, '수량', A.XF, 0)) * 1000) XF
                , DECODE(SUM(DECODE(NAME, '수량', A.XG, 0)), 0, 0, SUM(DECODE(NAME, '금액', A.XG, 0)) / SUM(DECODE(NAME, '수량', A.XG, 0)) * 1000) XG
                , DECODE(SUM(DECODE(NAME, '수량', A.XH, 0)), 0, 0, SUM(DECODE(NAME, '금액', A.XH, 0)) / SUM(DECODE(NAME, '수량', A.XH, 0)) * 1000) XH
                , DECODE(SUM(DECODE(NAME, '수량', A.ZN, 0)), 0, 0, SUM(DECODE(NAME, '금액', A.ZN, 0)) / SUM(DECODE(NAME, '수량', A.ZN, 0)) * 1000) ZN
                , DECODE(SUM(DECODE(NAME, '수량', A.XI, 0)), 0, 0, SUM(DECODE(NAME, '금액', A.XI, 0)) / SUM(DECODE(NAME, '수량', A.XI, 0)) * 1000) XI
                , DECODE(SUM(DECODE(NAME, '수량', A.XJ, 0)), 0, 0, SUM(DECODE(NAME, '금액', A.XJ, 0)) / SUM(DECODE(NAME, '수량', A.XJ, 0)) * 1000) XJ
                , DECODE(SUM(DECODE(NAME, '수량', A.XK, 0)), 0, 0, SUM(DECODE(NAME, '금액', A.XK, 0)) / SUM(DECODE(NAME, '수량', A.XK, 0)) * 1000) XK
                , DECODE(SUM(DECODE(NAME, '수량', A.XL, 0)), 0, 0, SUM(DECODE(NAME, '금액', A.XL, 0)) / SUM(DECODE(NAME, '수량', A.XL, 0)) * 1000) XL
                , DECODE(SUM(DECODE(NAME, '수량', A.XM, 0)), 0, 0, SUM(DECODE(NAME, '금액', A.XM, 0)) / SUM(DECODE(NAME, '수량', A.XM, 0)) * 1000) XM
                , DECODE(SUM(DECODE(NAME, '수량', A.XN, 0)), 0, 0, SUM(DECODE(NAME, '금액', A.XN, 0)) / SUM(DECODE(NAME, '수량', A.XN, 0)) * 1000) XN
                , 2 IDX
              FROM PLAN_ELEC_COST_AIA A, PLAN_ELEC_COST_CODE B    
              WHERE A.YEAR = :year
                AND A.NAME = B.SNAME(+)
                AND A.YEAR = B.YEAR(+)
                AND B.SNAME IN ('수량', '금액')
              GROUP BY A.YEAR
              UNION ALL                
              SELECT A.YEAR, '전체' MONTH, A.NAME, SUM(XA) XA, SUM(XB) XB, SUM(XC) XC, SUM(XD) XD, SUM(XE) XE, SUM(XF) XF, SUM(XG) XG
                , SUM(XH) XH, SUM(ZN) ZN, SUM(XI) XI, SUM(XJ) XJ, SUM(XK) XK, SUM(XL) XL, SUM(XM) XM, SUM(XN) XN, 3 IDX
              FROM PLAN_ELEC_COST_AIA A, PLAN_ELEC_COST_CODE B
              WHERE A.YEAR = :year
                AND A.NAME = B.SNAME(+)
                AND A.YEAR = B.YEAR(+)
                AND B.SNAME = '금액'
              GROUP BY A.YEAR, A.NAME`; 
      /*
        query = `SELECT A.YEAR, '전체' MONTH, A.NAME, SUM(XA) XA, SUM(XB) XB, SUM(XC) XC, SUM(XD) XD, SUM(XE) XE, SUM(XF) XF, SUM(XG) XG
                , SUM(XH) XH, SUM(ZN) ZN, SUM(XI) XI, SUM(XJ) XJ, SUM(XK) XK, SUM(XL) XL, SUM(XM) XM, SUM(XN) XN, B.IDX NUM
                FROM PLAN_ELEC_COST_AIA A, PLAN_ELEC_COST_CODE B
                WHERE A.YEAR = :year
                AND A.NAME = B.SNAME(+)
                AND A.YEAR = B.YEAR(+)
                GROUP BY A.YEAR, A.NAME, B.IDX
                ORDER BY A.NAME DESC`;  
      */
        binds = {year: year};                 
    }           
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
