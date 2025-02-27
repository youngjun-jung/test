const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 참조 관련 비즈니스 로직
exports.getRef1chk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;

  console.log("year: ", year);

  const query = `SELECT A.NUM, A.XA, A.XB, A.XC
              , ROUND(XD, 2) XD, ROUND(XE, 2) XE, ROUND(XF, 2) XF
              , CASE WHEN GUBUN1 = '0' THEN ROUND((XD + XE + XF)/3, 2)
                      WHEN GUBUN1 = '1' THEN ROUND(XD + XE + XF, 2)
                      ELSE 0
                      END AS XG     
              , ROUND(XH, 2) XH, ROUND(XI, 2) XI, ROUND(XJ, 2) XJ
              , CASE WHEN GUBUN1 = '0' THEN ROUND((XH + XI + XJ)/3, 2)
                      WHEN GUBUN1 = '1' THEN ROUND(XH + XI + XJ, 2)
                      ELSE 0
                      END AS XK
              , ROUND(XL, 2) XL, ROUND(XM, 2) XM, ROUND(XN, 2) XN
              , CASE WHEN GUBUN1 = '0' THEN ROUND((XL + XM + XN)/3, 2)
                      WHEN GUBUN1 = '1' THEN ROUND(XL + XM + XN, 2)
                      ELSE 0
                      END AS XO    
              , ROUND(XP, 2) XP, ROUND(XQ, 2) XQ, ROUND(XR, 2) XR
              , CASE WHEN GUBUN1 = '0' THEN ROUND((XP + XQ + XR)/3, 2)
                      WHEN GUBUN1 = '1' THEN ROUND(XP + XQ + XR, 2)
                      ELSE 0
                      END AS XS              
              FROM PLAN_REF_AUTO_CODE A, PLUG B
              WHERE A.XB = B.XB(+)
              AND A.YEAR = B.YEAR(+)
              AND A.YEAR = :year
              AND A.USE_YN = 'Y'
              ORDER BY A.NUM`;                 

 const binds = {year: year};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
