const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getLaborcosttchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const gubun = receivedData.gubun;

  console.log("year: ", year);
  console.log("gubun: ", gubun);

  let query;
  let binds;

  if(gubun != '0')
  {
      query = `SELECT GUBUN, YEAR, '' MONTH, SNAME NAME, SUM(XA) XA, SUM(XB) XB, SUM(XC) XC, SUM(XD) XD, SUM(XE) XE, SUM(XF) XF, SUM(XG) XG, SUM(XH) XH, SUM(XI) XI, SUM(XJ) XJ     
                    , SUM(XK) XK, SUM(XL) XL, SUM(XM) XM, SUM(XN) XN, SUM(XO) XO, SUM(XP) XP, SUM(XQ) XQ, SUM(XR) XR, SUM(XS) XS, SUM(XT) XT, SUM(XU) XU, SUM(XV) XV, SUM(XW) XW, SUM(XX) XX
                    , SUM(XY) XY, SUM(XZ) XZ, SUM(XAA) XAA, IDX
                    FROM (SELECT DISTINCT X.*, A.*
                        FROM (SELECT SCODE, SNAME, IDX FROM PLAN_LABOR_COST_CODE WHERE YEAR = :year) X
                        LEFT JOIN (SELECT * FROM PLAN_LABOR_COST WHERE YEAR = :year AND GUBUN = :gubun) A
                        ON X.SNAME = A.NAME
                        )
                    GROUP BY GUBUN, YEAR, SNAME, IDX    
                    ORDER BY YEAR, MONTH, IDX`;               
                    
      binds = {year: year, gubun: gubun};              
  }
  else
  {
      query = `SELECT GUBUN, YEAR, '' MONTH, SNAME NAME, SUM(XA) XA, SUM(XB) XB, SUM(XC) XC, SUM(XD) XD, SUM(XE) XE, SUM(XF) XF, SUM(XG) XG, SUM(XH) XH, SUM(XI) XI, SUM(XJ) XJ     
                    , SUM(XK) XK, SUM(XL) XL, SUM(XM) XM, SUM(XN) XN, SUM(XO) XO, SUM(XP) XP, SUM(XQ) XQ, SUM(XR) XR, SUM(XS) XS, SUM(XT) XT, SUM(XU) XU, SUM(XV) XV, SUM(XW) XW, SUM(XX) XX
                    , SUM(XY) XY, SUM(XZ) XZ, SUM(XAA) XAA, IDX
                FROM (SELECT DISTINCT A.GUBUN, A.YEAR, A.MONTH, SNAME, A.XA*B.XA*VALUE XA, A.XB*B.XB*VALUE XB, A.XC*B.XC*VALUE XC
                , A.XD*B.XD*VALUE XD, A.XE*B.XE*VALUE XE, A.XF*B.XF*VALUE XF, A.XG*B.XG*VALUE XG, A.XH*B.XH*VALUE XH, A.XI*B.XI*VALUE XI
                , A.XJ*B.XJ*VALUE XJ, A.XK*B.XK*VALUE XK, A.XL*B.XL*VALUE XL, A.XM*B.XM*VALUE XM, A.XN*B.XN*VALUE XN, A.XO*B.XO*VALUE XO
                , A.XP*B.XP*VALUE XP, A.XQ*B.XQ*VALUE XQ, A.XR*B.XR*VALUE XR, A.XS*B.XS*VALUE XS, A.XT*B.XT*VALUE XT, A.XU*B.XU*VALUE XU
                , A.XV*B.XV*VALUE XV, A.XW*B.XW*VALUE XW, A.XX*B.XX*VALUE XX, A.XY*B.XY*VALUE XY, A.XZ*B.XZ*VALUE XZ, A.XAA*B.XAA*VALUE XAA, X.IDX
                    FROM (SELECT SCODE, SNAME, IDX FROM PLAN_LABOR_COST_CODE WHERE YEAR = :year) X
                    , (SELECT * FROM PLAN_LABOR_COST WHERE GUBUN = '1') A
                    , (SELECT * FROM PLAN_LABOR_COST WHERE GUBUN = '2') B
                    , (SELECT VALUE FROM PLAN_LABOR_COST_MANUAL WHERE YEAR = '2025') C
                    WHERE X.SNAME = A.NAME(+)
                    AND X.SNAME = B.NAME(+)
                    AND A.YEAR = B.YEAR
                    AND A.MONTH = B.MONTH
                    AND A.NAME = B.NAME
                    AND A.YEAR = :year)
                GROUP BY GUBUN, YEAR, SNAME, IDX    
                ORDER BY YEAR, MONTH, IDX`;  

      binds = {year: year};                 
  }           

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
