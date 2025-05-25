const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getEleccosttchk = async (req, res) => {

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
      query = `SELECT GUBUN, YEAR, '' MONTH, SNAME NAME, SUM(XA) XA, SUM(XB) XB, SUM(XC) XC, SUM(XD) XD, SUM(XE) XE, SUM(XF) XF, SUM(XF1) XF1, SUM(XG) XG, SUM(XH) XH, SUM(XI) XI, SUM(XJ) XJ     
              , SUM(XK) XK, SUM(XL) XL, SUM(XM) XM, SUM(XN) XN, SUM(XO) XO, SUM(XP) XP, SUM(XQ) XQ, SUM(XR) XR, SUM(XS) XS, SUM(XT) XT, SUM(XU) XU, SUM(XV) XV, SUM(XW) XW, SUM(XX) XX
              , SUM(XY) XY, SUM(XZ) XZ, NVL(SUM(XAA), 0) XAA, IDX
              FROM (SELECT DISTINCT X.*, A.*
                  FROM (SELECT SCODE, SNAME, IDX FROM BACKUP_PLAN_ELEC_COST_CODE WHERE BACKUP_ID = :backupid) X
                  LEFT JOIN (SELECT * FROM BACKUP_PLAN_ELEC_COST WHERE BACKUP_ID = :backupid AND GUBUN = :gubun AND PROCID = :procid) A
                  ON X.SNAME = A.NAME
                  WHERE X.SNAME = '수량'
                  )
              GROUP BY GUBUN, YEAR, SNAME, IDX    
              UNION ALL
              SELECT GUBUN, YEAR, '' MONTH, '단가' NAME
              , DECODE(SUM(DECODE(SNAME, '수량', XA, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XA, 0)) / SUM(DECODE(SNAME, '수량', XA, 0)) * 1000) XA
              , DECODE(SUM(DECODE(SNAME, '수량', XB, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XB, 0)) / SUM(DECODE(SNAME, '수량', XB, 0)) * 1000) XB
              , DECODE(SUM(DECODE(SNAME, '수량', XC, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XC, 0)) / SUM(DECODE(SNAME, '수량', XC, 0)) * 1000) XC
              , DECODE(SUM(DECODE(SNAME, '수량', XD, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XD, 0)) / SUM(DECODE(SNAME, '수량', XD, 0)) * 1000) XD
              , DECODE(SUM(DECODE(SNAME, '수량', XE, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XE, 0)) / SUM(DECODE(SNAME, '수량', XE, 0)) * 1000) XE
              , DECODE(SUM(DECODE(SNAME, '수량', XF, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XF, 0)) / SUM(DECODE(SNAME, '수량', XF, 0)) * 1000) XF
              , DECODE(SUM(DECODE(SNAME, '수량', XF1, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XF1, 0)) / SUM(DECODE(SNAME, '수량', XF1, 0)) * 1000) XF1
              , DECODE(SUM(DECODE(SNAME, '수량', XG, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XG, 0)) / SUM(DECODE(SNAME, '수량', XG, 0)) * 1000) XG
              , DECODE(SUM(DECODE(SNAME, '수량', XH, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XH, 0)) / SUM(DECODE(SNAME, '수량', XH, 0)) * 1000) XH
              , DECODE(SUM(DECODE(SNAME, '수량', XI, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XI, 0)) / SUM(DECODE(SNAME, '수량', XI, 0)) * 1000) XI
              , DECODE(SUM(DECODE(SNAME, '수량', XJ, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XJ, 0)) / SUM(DECODE(SNAME, '수량', XJ, 0)) * 1000) XJ
              , DECODE(SUM(DECODE(SNAME, '수량', XK, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XK, 0)) / SUM(DECODE(SNAME, '수량', XK, 0)) * 1000) XK
              , DECODE(SUM(DECODE(SNAME, '수량', XL, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XL, 0)) / SUM(DECODE(SNAME, '수량', XL, 0)) * 1000) XL
              , DECODE(SUM(DECODE(SNAME, '수량', XM, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XM, 0)) / SUM(DECODE(SNAME, '수량', XM, 0)) * 1000) XM
              , DECODE(SUM(DECODE(SNAME, '수량', XN, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XN, 0)) / SUM(DECODE(SNAME, '수량', XN, 0)) * 1000) XN
              , DECODE(SUM(DECODE(SNAME, '수량', XO, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XO, 0)) / SUM(DECODE(SNAME, '수량', XO, 0)) * 1000) XO
              , DECODE(SUM(DECODE(SNAME, '수량', XP, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XP, 0)) / SUM(DECODE(SNAME, '수량', XP, 0)) * 1000) XP
              , DECODE(SUM(DECODE(SNAME, '수량', XQ, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XQ, 0)) / SUM(DECODE(SNAME, '수량', XQ, 0)) * 1000) XQ
              , DECODE(SUM(DECODE(SNAME, '수량', XR, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XR, 0)) / SUM(DECODE(SNAME, '수량', XR, 0)) * 1000) XR
              , DECODE(SUM(DECODE(SNAME, '수량', XS, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XS, 0)) / SUM(DECODE(SNAME, '수량', XS, 0)) * 1000) XS
              , DECODE(SUM(DECODE(SNAME, '수량', XT, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XT, 0)) / SUM(DECODE(SNAME, '수량', XT, 0)) * 1000) XT
              , DECODE(SUM(DECODE(SNAME, '수량', XU, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XU, 0)) / SUM(DECODE(SNAME, '수량', XU, 0)) * 1000) XU
              , DECODE(SUM(DECODE(SNAME, '수량', XV, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XV, 0)) / SUM(DECODE(SNAME, '수량', XV, 0)) * 1000) XV
              , DECODE(SUM(DECODE(SNAME, '수량', XW, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XW, 0)) / SUM(DECODE(SNAME, '수량', XW, 0)) * 1000) XW
              , DECODE(SUM(DECODE(SNAME, '수량', XX, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XX, 0)) / SUM(DECODE(SNAME, '수량', XX, 0)) * 1000) XX
              , DECODE(SUM(DECODE(SNAME, '수량', XY, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XY, 0)) / SUM(DECODE(SNAME, '수량', XY, 0)) * 1000) XY
              , DECODE(SUM(DECODE(SNAME, '수량', XZ, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XZ, 0)) / SUM(DECODE(SNAME, '수량', XZ, 0)) * 1000) XZ
              , DECODE(SUM(DECODE(SNAME, '수량', XAA, 0)), 0, 0, SUM(DECODE(SNAME, '금액', XAA, 0)) / SUM(DECODE(SNAME, '수량', XAA, 0)) * 1000) XAA
              , 2 IDX
              FROM (SELECT DISTINCT X.*, A.*
                  FROM (SELECT SCODE, SNAME, IDX FROM BACKUP_PLAN_ELEC_COST_CODE WHERE BACKUP_ID = :backupid) X
                  LEFT JOIN (SELECT * FROM BACKUP_PLAN_ELEC_COST WHERE BACKUP_ID = :backupid AND GUBUN = :gubun AND PROCID = :procid) A
                  ON X.SNAME = A.NAME
                  WHERE X.SNAME IN ('수량', '금액')
                  )
              GROUP BY GUBUN, YEAR
              UNION ALL
              SELECT GUBUN, YEAR, '' MONTH, SNAME NAME, SUM(XA) XA, SUM(XB) XB, SUM(XC) XC, SUM(XD) XD, SUM(XE) XE, SUM(XF) XF, SUM(XF1) XF1, SUM(XG) XG, SUM(XH) XH, SUM(XI) XI, SUM(XJ) XJ     
              , SUM(XK) XK, SUM(XL) XL, SUM(XM) XM, SUM(XN) XN, SUM(XO) XO, SUM(XP) XP, SUM(XQ) XQ, SUM(XR) XR, SUM(XS) XS, SUM(XT) XT, SUM(XU) XU, SUM(XV) XV, SUM(XW) XW, SUM(XX) XX
              , SUM(XY) XY, SUM(XZ) XZ, NVL(SUM(XAA), 0), IDX
              FROM (SELECT DISTINCT X.*, A.*
                  FROM (SELECT SCODE, SNAME, IDX FROM BACKUP_PLAN_ELEC_COST_CODE WHERE BACKUP_ID = :backupid) X
                  LEFT JOIN (SELECT * FROM BACKUP_PLAN_ELEC_COST WHERE BACKUP_ID = :backupid AND GUBUN = :gubun AND PROCID = :procid) A
                  ON X.SNAME = A.NAME
                  WHERE X.SNAME = '금액'
                  )
              GROUP BY GUBUN, YEAR, SNAME, IDX 
              ORDER BY YEAR, MONTH, IDX`;               
                    
      binds = {backupid: backupid, gubun: gubun, procid: procid};              
  }  

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
