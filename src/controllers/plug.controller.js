const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlugchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);

  const query = `SELECT NUM, XA, XB, XC, XD, XE, XF, XG, XH, XI, XJ, XK, XL, XM, XN, XO, XP, XQ, XR, XS
                , XT, XU, XV, XW, XX, XY, XZ, XAA, XAB, XAC, XAD, XAE, XAF, XAG, XAH, XAI, XAJ
                , XAK, XAL, XAM, XAN, XAO, XAP, XAQ, XAR, XAS, YEAR, GUBUN1, USE_YN
                FROM PLUG 
                WHERE YEAR = :year
                AND USE_YN = 'Y'
                ORDER BY NUM`;                 

 const binds = {year: year};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
