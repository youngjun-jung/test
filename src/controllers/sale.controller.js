const { executeQuery } = require('../config/queries');
const logger = require('../../logger'); 

// 판매량 관련 비즈니스 로직
exports.getSalechk = async (req, res) => {

    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.query;

    const frdate = receivedData.frdate;
    const todate = receivedData.todate;

    console.log("frdate: ", frdate);
    console.log("todate: ", todate);

    const query = `SELECT (SELECT CODENM FROM PRODUCT_CODE WHERE CODE = B.LCODE)  AS "SALE"
                  , B.CODENM AS "NAME_1"
                  , SUM(DECODE(PATH_CODE, '10', ROUND(WEIGHT), 0)) AS "IN_1"
                  , SUM(DECODE(PATH_CODE, '20', ROUND(WEIGHT), 0)) AS "IN_LOCAL_1"
                  , SUM(DECODE(PATH_CODE, '30', ROUND(WEIGHT), '40', ROUND(WEIGHT), 0)) AS "OUT_1"
                  , SUM(DECODE(PATH_CODE, '10', 0, '20', 0, '30', 0, '40', 0, ROUND(WEIGHT))) AS "ETC_1"
                  , SUM(ROUND(WEIGHT)) AS "SUM_1"
                  , (SELECT CODENM FROM PRODUCT_CODE WHERE CODE = B.LCODE)  AS "INCOME"
                  , B.CODENM AS "NAME_2"
                  , SUM(DECODE(PATH_CODE, '10', ROUND(AMOUNT_WON / 1000000), 0)) AS "IN_2"
                  , SUM(DECODE(PATH_CODE, '20', ROUND(AMOUNT_WON / 1000000), 0)) AS "IN_LOCAL_2"
                  , SUM(DECODE(PATH_CODE, '30', ROUND(AMOUNT_WON / 1000000), '40', ROUND(AMOUNT_WON / 1000000), 0)) AS "OUT_2"
                  , SUM(DECODE(PATH_CODE, '10', 0, '20', 0, '30', 0, '40', 0, ROUND(AMOUNT_WON / 1000000))) AS "ETC_2"
                  , SUM(ROUND(AMOUNT_WON / 1000000)) AS "SUM_2"
                  FROM SALE_LEDGER A, PRODUCT_DTL_CODE B
                  WHERE REPLACE(A.SALEDATE, '/', '') BETWEEN :frdate AND :todate
                  AND A.PRODUCT_CODE = B.CODE(+)
                  AND A.AMOUNT_WON <> 0
                  GROUP BY B.LCODE, B.CODENM, B.IDX
                  ORDER BY B.IDX`;                 

   const binds = {frdate: frdate, todate: todate};
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };

  
