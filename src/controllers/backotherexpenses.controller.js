const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getOtherexpenseschk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const backupid = receivedData.backupid;
  const gubun = receivedData.gubun;
  const procid = receivedData.procid;

  console.log("backupid: ", backupid);
  console.log("gubun: ", gubun);
  console.log("procid: ", procid);

  let query;
  let binds;

  if(gubun != '0')
  {
      query = `SELECT GUBUN, YEAR, MONTH, SNAME NAME, XA, XB, XC, XD, XE, XF, XG, XH, XI, XJ
                    , XK, XL, XM, XN, XO, XP, XQ, XR, XS, XT, XU, XV, XW, XX, XY, XZ, XAA, X.IDX
                    FROM (SELECT SCODE, SNAME, IDX FROM BACKUP_PLAN_OTHER_EXPENSES_CODE WHERE BACKUP_ID = :backupid AND PROCID = :procid) X, BACKUP_PLAN_OTHER_EXPENSES A
                    WHERE X.SNAME = A.NAME(+)
                    AND X.PROCID = A.PROCID(+)
                    AND BACKUP_ID(+) = :backupid
                    AND GUBUN(+) = :gubun
                    ORDER BY YEAR, MONTH, X.IDX`;  
                    
      binds = {backupid: backupid, gubun: gubun};              
  }
  else
  {
      query = `SELECT A.GUBUN, A.YEAR, A.MONTH, SNAME NAME, A.XA*B.XA XA, A.XB*B.XB XB, A.XC*B.XC XC
                , A.XD*B.XD XD, A.XE*B.XE XE, A.XF*B.XF XF, A.XG*B.XG XG, A.XH*B.XH XH, A.XI*B.XI XI
                , A.XJ*B.XJ XJ, A.XK*B.XK XK, A.XL*B.XL XL, A.XM*B.XM XM, A.XN*B.XN XN, A.XO*B.XO XO
                , A.XP*B.XP XP, A.XQ*B.XQ XQ, A.XR*B.XR XR, A.XS*B.XS XS, A.XT*B.XT XT, A.XU*B.XU XU
                , A.XV*B.XV XV, A.XW*B.XW XW, A.XX*B.XX XX, A.XY*B.XY XY, A.XZ*B.XZ XZ, A.XAA*B.XAA XAA, X.IDX
                    FROM (SELECT DISTINCT SCODE, SNAME, IDX FROM BACKUP_PLAN_OTHER_EXPENSES_CODE WHERE BACKUP_ID = :backupid) X
                    , (SELECT * FROM BACKUP_PLAN_OTHER_EXPENSES WHERE GUBUN = '1') A
                    , (SELECT * FROM BACKUP_PLAN_OTHER_EXPENSES WHERE GUBUN = '2') B
                    WHERE X.SNAME = A.NAME(+)
                    AND X.SNAME = B.NAME(+)
                    AND A.BACKUP_ID = B.BACKUP_ID
                    AND A.MONTH = B.MONTH
                    AND A.NAME = B.NAME
                    AND A.BACKUP_ID = :backupid
                    ORDER BY A.BACKUP_ID, MONTH, X.IDX`;  

      binds = {backupid: backupid};                 
  }           

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
