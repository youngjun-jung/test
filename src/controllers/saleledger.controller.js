const { executeQuery } = require('../config/queries');
const logger = require('../../logger'); 

// 판매량 관련 비즈니스 로직
exports.getSaleledgerchk = async (req, res) => {

    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.query;

    const frdate = receivedData.frdate;
    const todate = receivedData.todate;
    const codenm = receivedData.codenm;

    console.log("frdate: ", frdate);
    console.log("todate: ", todate);
    console.log("codenm: ", codenm);

    const query = `SELECT A.SALEDATE, A.INSERT_ID, A.PATH_NAME, A.PRODUCT_CODE, A.PRODUCT_NAME, A.MEASURE, A.WEIGHT, A.AMOUNT_WON, A.VAT
                  FROM SALE_LEDGER A, PRODUCT_DTL_CODE B
                  WHERE REPLACE(A.SALEDATE, '/', '') BETWEEN :frdate AND :todate
                  AND A.PRODUCT_CODE = B.CODE(+)
                  AND A.AMOUNT_WON <> 0
                  AND (B.LCODE, B.CODE) in (SELECT LCODE, CODE FROM PRODUCT_DTL_CODE WHERE TRIM(CODENM) = TRIM(:codenm))
                  ORDER BY SALEDATE, STATEMENT_NO`;                 

   const binds = {frdate: frdate, todate: todate, codenm: codenm};
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };

  
