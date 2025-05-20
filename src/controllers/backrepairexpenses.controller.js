const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getRepairexpenseschk = async (req, res) => {

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
      query = `SELECT GUBUN, A.YEAR, MONTH, X.SNAME NAME, XA, XB, XC, XD, XE, XF, XG, XH, XI, XJ
                    , XK, XL, XM, XN, XO, XP, XQ, XR, XS, XT, XU, XV, XW, XX, XY, XZ, XAA, X.IDX
                    FROM (SELECT SCODE, SNAME, IDX FROM BACKUP_PLAN_REPAIR_EXPENSES_CODE WHERE YEAR = :year) X, BACKUP_PLAN_REPAIR_EXPENSES A
                    , (SELECT * FROM BACKUP_PLAN_REPAIR_EXPENSES_MANUAL WHERE YEAR = '2025') C
                    WHERE X.SNAME = A.NAME(+)
                    AND X.SNAME = C.SNAME(+)
                    AND A.YEAR(+) = :year
                    AND GUBUN(+) = :gubun
                    ORDER BY YEAR, MONTH, X.IDX`;  
                    
      binds = {year: year, gubun: gubun};              
  }
  else
  {
      query = `SELECT A.GUBUN, A.YEAR, A.MONTH, X.SNAME NAME, A.XA*B.XA*C.VALUE XA, A.XB*B.XB*C.VALUE XB, A.XC*B.XC*C.VALUE XC
                , A.XD*B.XD*C.VALUE XD, A.XE*B.XE*C.VALUE XE, A.XF*B.XF*C.VALUE XF, A.XG*B.XG*C.VALUE XG, A.XH*B.XH*C.VALUE XH, A.XI*B.XI*C.VALUE XI
                , A.XJ*B.XJ*C.VALUE XJ, A.XK*B.XK*C.VALUE XK, A.XL*B.XL*C.VALUE XL, A.XM*B.XM*C.VALUE XM, A.XN*B.XN*C.VALUE XN, A.XO*B.XO*C.VALUE XO
                , A.XP*B.XP*C.VALUE XP, A.XQ*B.XQ*C.VALUE XQ, A.XR*B.XR*C.VALUE XR, A.XS*B.XS*C.VALUE XS, A.XT*B.XT*C.VALUE XT, A.XU*B.XU*C.VALUE XU
                , A.XV*B.XV*C.VALUE XV, A.XW*B.XW*C.VALUE XW, A.XX*B.XX*C.VALUE XX, A.XY*B.XY*C.VALUE XY, A.XZ*B.XZ*C.VALUE XZ, A.XAA*B.XAA*C.VALUE XAA, X.IDX
                    FROM (SELECT SCODE, SNAME, IDX FROM BACKUP_PLAN_REPAIR_EXPENSES_CODE WHERE YEAR = :year) X
                    , (SELECT * FROM BACKUP_PLAN_REPAIR_EXPENSES WHERE GUBUN = '1') A
                    , (SELECT * FROM BACKUP_PLAN_REPAIR_EXPENSES WHERE GUBUN = '2') B
                    , (SELECT * FROM BACKUP_PLAN_REPAIR_EXPENSES_MANUAL WHERE YEAR = :year) C
                    WHERE X.SNAME = A.NAME(+)
                    AND X.SNAME = B.NAME(+)
                    AND A.YEAR = B.YEAR
                    AND A.MONTH = B.MONTH
                    AND A.NAME = B.NAME
                    AND X.SNAME = C.SNAME(+)
                    AND A.YEAR = :year
                    ORDER BY YEAR, MONTH, X.IDX`;  

      binds = {year: year};                 
  }           

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
