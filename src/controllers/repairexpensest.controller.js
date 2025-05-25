const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getRepairexpensestchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const gubun = receivedData.gubun;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("gubun: ", gubun);
  console.log("procid: ", procid);

  let query;
  let binds;

  if(gubun != '0')
  {
      query = `SELECT GUBUN, YEAR, '' MONTH, SNAME NAME, SUM(XA) XA, SUM(XB) XB, SUM(XC) XC, SUM(XD) XD, SUM(XE) XE, SUM(XF) XF, SUM(XG) XG, SUM(XH) XH, SUM(XI) XI, SUM(XJ) XJ     
                    , SUM(XK) XK, SUM(XL) XL, SUM(XM) XM, SUM(XN) XN, SUM(XO) XO, SUM(XP) XP, SUM(XQ) XQ, SUM(XR) XR, SUM(XS) XS, SUM(XT) XT, SUM(XU) XU, SUM(XV) XV, SUM(XW) XW, SUM(XX) XX
                    , SUM(XY) XY, SUM(XZ) XZ, SUM(XAA) XAA, IDX
                    FROM (SELECT DISTINCT X.*, A.*
                        FROM (SELECT SCODE, SNAME, IDX FROM PLAN_REPAIR_EXPENSES_CODE WHERE YEAR = :year) X
                        LEFT JOIN (SELECT * FROM PLAN_REPAIR_EXPENSES WHERE YEAR = :year AND GUBUN = :gubun AND PROCID = :procid) A
                        ON X.SNAME = A.NAME
                        )
                    GROUP BY GUBUN, YEAR, SNAME, IDX    
                    ORDER BY YEAR, MONTH, IDX`;               
                    
      binds = {year: year, gubun: gubun, procid: procid};              
  }
  else
  {
      query = `SELECT GUBUN, YEAR, '' MONTH, SNAME NAME, SUM(XA) XA, SUM(XB) XB, SUM(XC) XC, SUM(XD) XD, SUM(XE) XE, SUM(XF) XF, SUM(XG) XG, SUM(XH) XH, SUM(XI) XI, SUM(XJ) XJ     
                    , SUM(XK) XK, SUM(XL) XL, SUM(XM) XM, SUM(XN) XN, SUM(XO) XO, SUM(XP) XP, SUM(XQ) XQ, SUM(XR) XR, SUM(XS) XS, SUM(XT) XT, SUM(XU) XU, SUM(XV) XV, SUM(XW) XW, SUM(XX) XX
                    , SUM(XY) XY, SUM(XZ) XZ, SUM(XAA) XAA, IDX
                FROM (SELECT DISTINCT A.GUBUN, A.YEAR, A.MONTH, X.SNAME, A.XA*B.XA*C.VALUE XA, A.XB*B.XB*C.VALUE XB, A.XC*B.XC*C.VALUE XC
                , A.XD*B.XD*C.VALUE XD, A.XE*B.XE*C.VALUE XE, A.XF*B.XF*C.VALUE XF, A.XG*B.XG*C.VALUE XG, A.XH*B.XH*C.VALUE XH, A.XI*B.XI*C.VALUE XI
                , A.XJ*B.XJ*C.VALUE XJ, A.XK*B.XK*C.VALUE XK, A.XL*B.XL*C.VALUE XL, A.XM*B.XM*C.VALUE XM, A.XN*B.XN*C.VALUE XN, A.XO*B.XO*C.VALUE XO
                , A.XP*B.XP*C.VALUE XP, A.XQ*B.XQ*C.VALUE XQ, A.XR*B.XR*C.VALUE XR, A.XS*B.XS*C.VALUE XS, A.XT*B.XT*C.VALUE XT, A.XU*B.XU*C.VALUE XU
                , A.XV*B.XV*C.VALUE XV, A.XW*B.XW*C.VALUE XW, A.XX*B.XX*C.VALUE XX, A.XY*B.XY*C.VALUE XY, A.XZ*B.XZ*C.VALUE XZ, A.XAA*B.XAA*C.VALUE XAA, X.IDX
                    FROM (SELECT SCODE, SNAME, IDX FROM PLAN_REPAIR_EXPENSES_CODE WHERE YEAR = :year) X
                    , (SELECT * FROM PLAN_REPAIR_EXPENSES WHERE GUBUN = '1' AND PROCID = :procid) A
                    , (SELECT * FROM PLAN_REPAIR_EXPENSES WHERE GUBUN = '2' AND PROCID = :procid) B
                    , (SELECT * FROM PLAN_REPAIR_EXPENSES_MANUAL WHERE YEAR = :year) C
                    WHERE X.SNAME = A.NAME(+)
                    AND X.SNAME = B.NAME(+)
                    AND A.YEAR = B.YEAR
                    AND A.MONTH = B.MONTH
                    AND A.NAME = B.NAME
                    AND X.SNAME = C.SNAME(+)
                    AND A.YEAR = :year)
                GROUP BY GUBUN, YEAR, SNAME, IDX    
                ORDER BY YEAR, MONTH, IDX`;  

      binds = {year: year, procid: procid};                 
  }           

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
