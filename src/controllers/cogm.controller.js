const { executeQuery } = require('../config/queries');
const logger = require('../../logger'); 

// 제조원가 관련 비즈니스 로직
exports.getCogmchk = async (req, res) => {

    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.query;

    const frdate = receivedData.frdate;
    const todate = receivedData.todate;
    const class_code = receivedData.class_code;

    console.log("frdate: ", frdate);
    console.log("todate: ", todate);
    console.log("class_code: ", class_code);

    const query = `SELECT A.CLASS_CODE, D.CODENM, A.LCODE, B.LNAME LCODENM, NVL(A.MCODE, 'M'|| SUBSTR(A.LCODE , 3, 1) || '01') MCODE
                  , C.MNAME MCODENM, A.SCODE, A.MAT_CODE, A.SNAME, A.MEASURE
                  , SUM(WEIGHT) WEIGHT
                  , SUM(UNIT_COST) UNIT_COST
                  , SUM(AMOUNT_TOT) AMOUNT_TOT
                  , SUM(AMOUNT_DIRECT) AMOUNT_DIRECT
                  , SUM(AMOUNT_INDIRECT) AMOUNT_INDIRECT
                  FROM COGM_LEDGER A, COGM_LCODE B, COGM_MCODE C, COGM_CLASS_CODE	D
                  WHERE A.CLASS_CODE = B.CLASS_CODE(+)
                  AND A.CLASS_CODE = C.CLASS_CODE(+)
                  AND A.CLASS_CODE = D.CODE(+)
                  AND A.LCODE = B.LCODE(+)
                  AND A.MCODE = C.MCODE(+)
                  AND A.ADTDATE BETWEEN :frdate AND :todate
                  AND A.CLASS_CODE LIKE :class_code
                  GROUP BY A.CLASS_CODE, D.CODENM, A.LCODE, B.LNAME, A.MCODE, C.MNAME, A.SCODE, A.MAT_CODE, A.SNAME, A.MEASURE
                  ORDER BY A.LCODE, A.MCODE, A.SNAME`;                 

   const binds = {frdate: frdate, todate: todate, class_code: class_code};
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };

  
