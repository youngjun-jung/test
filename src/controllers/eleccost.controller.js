const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getEleccostchk = async (req, res) => {

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
      query = `SELECT GUBUN, YEAR, MONTH, SNAME NAME, XA, XB, XC, XD, XE, XF, XF1, XG, XH, XI, XJ
                    , XK, XL, XM, XN, XO, XP, XQ, XR, XS, XT, XU, XV, XW, XX, XY, XZ, XAA, X.IDX
                    FROM (SELECT SCODE, SNAME, IDX FROM PLAN_ELEC_COST_CODE WHERE YEAR = :year) X, PLAN_ELEC_COST A
                    WHERE X.SNAME = A.NAME(+)
                    AND YEAR(+) = :year
                    AND GUBUN(+) = :gubun
                    AND A.PROCID(+) = :procid
                    ORDER BY YEAR, MONTH, X.IDX`;  
                    
      binds = {year: year, gubun: gubun, procid: procid};              
  }  

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
