const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getDepreciationtchk = async (req, res) => {

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
                        FROM (SELECT SCODE, SNAME, IDX FROM PLAN_DEPRECIATION_CODE WHERE YEAR = :year) X
                        LEFT JOIN (SELECT * FROM PLAN_DEPRECIATION WHERE YEAR = :year AND GUBUN = :gubun AND PROCID = :procid) A
                        ON X.SNAME = A.NAME
                        )
                    GROUP BY GUBUN, YEAR, SNAME, IDX    
                    ORDER BY YEAR, MONTH, IDX`;               
                    
      binds = {year: year, gubun: gubun,procid: procid};              
  }
  else
  {
      query = `SELECT GUBUN, YEAR, '' MONTH, SNAME NAME, SUM(XA) XA, SUM(XB) XB, SUM(XC) XC, SUM(XD) XD, SUM(XE) XE, SUM(XF) XF, SUM(XG) XG, SUM(XH) XH, SUM(XI) XI, SUM(XJ) XJ     
                    , SUM(XK) XK, SUM(XL) XL, SUM(XM) XM, SUM(XN) XN, SUM(XO) XO, SUM(XP) XP, SUM(XQ) XQ, SUM(XR) XR, SUM(XS) XS, SUM(XT) XT, SUM(XU) XU, SUM(XV) XV, SUM(XW) XW, SUM(XX) XX
                    , SUM(XY) XY, SUM(XZ) XZ, SUM(XAA) XAA, IDX
                FROM (SELECT DISTINCT A.GUBUN, A.YEAR, A.MONTH, SNAME, A.XA*B.XA XA, A.XB*B.XB XB, A.XC*B.XC XC
                , A.XD*B.XD XD, A.XE*B.XE XE, A.XF*B.XF XF, A.XG*B.XG XG, A.XH*B.XH XH, A.XI*B.XI XI
                , A.XJ*B.XJ XJ, A.XK*B.XK XK, A.XL*B.XL XL, A.XM*B.XM XM, A.XN*B.XN XN, A.XO*B.XO XO
                , A.XP*B.XP XP, A.XQ*B.XQ XQ, A.XR*B.XR XR, A.XS*B.XS XS, A.XT*B.XT XT, A.XU*B.XU XU
                , A.XV*B.XV XV, A.XW*B.XW XW, A.XX*B.XX XX, A.XY*B.XY XY, A.XZ*B.XZ XZ, A.XAA*B.XAA XAA, X.IDX
                    FROM (SELECT SCODE, SNAME, IDX FROM PLAN_DEPRECIATION_CODE WHERE YEAR = :year) X
                    , (SELECT * FROM PLAN_DEPRECIATION WHERE GUBUN = '1' AND PROCID = :procid) A
                    , (SELECT * FROM PLAN_DEPRECIATION WHERE GUBUN = '2' AND PROCID = :procid) B
                    WHERE X.SNAME = A.NAME(+)
                    AND X.SNAME = B.NAME(+)
                    AND A.YEAR = B.YEAR
                    AND A.MONTH = B.MONTH
                    AND A.NAME = B.NAME
                    AND A.YEAR = :year)
                GROUP BY GUBUN, YEAR, SNAME, IDX    
                ORDER BY YEAR, MONTH, IDX`;  

      binds = {year: year,procid: procid};                 
  }           

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
