const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getEleccosttchk = async (req, res) => {

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
      query = `SELECT GUBUN, YEAR, '' MONTH, SNAME NAME, SUM(XA) XA, SUM(XB) XB, SUM(XC) XC, SUM(XD) XD, SUM(XE) XE, SUM(XF) XF, SUM(XF1) XF1, SUM(XG) XG, SUM(XH) XH, SUM(XI) XI, SUM(XJ) XJ     
                    , SUM(XK) XK, SUM(XL) XL, SUM(XM) XM, SUM(XN) XN, SUM(XO) XO, SUM(XP) XP, SUM(XQ) XQ, SUM(XR) XR, SUM(XS) XS, SUM(XT) XT, SUM(XU) XU, SUM(XV) XV, SUM(XW) XW, SUM(XX) XX
                    , SUM(XY) XY, SUM(XZ) XZ, SUM(XAA) XAA, IDX
                    FROM (SELECT DISTINCT X.*, A.*
                        FROM PLAN_ELEC_COST_CODE X
                        LEFT JOIN (SELECT * FROM PLAN_ELEC_COST WHERE YEAR = :year AND GUBUN = :gubun) A
                        ON X.SNAME = A.NAME
                        )
                    GROUP BY GUBUN, YEAR, SNAME, IDX    
                    ORDER BY YEAR, MONTH, IDX`;               
                    
      binds = {year: year, gubun: gubun};              
  }  

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
