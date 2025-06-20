const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/plangeneraladministrative.procedure');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlangeneraladministrativechk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;

  console.log("year: ", year);

  // 프로시저 호출
    const data1 = await executeProcedure.callPlangeneraladministrativeproc(year);

    logger.info(`req data : ${JSON.stringify(data1, null, 2)}`);

    if (!data1 || Object.keys(data1).length === 0) {
      res.status(404).json({ success: false, message: '[오류]처리 실패', error: 'Procedure proc error' });
    }

  const query = `SELECT A.YEAR, LNAME, MNAME, SNAME, VALUE_1, VALUE_2, VALUE_3, VALUE_4, VALUE_5, VALUE_6, VALUE_7, VALUE_8, VALUE_9, VALUE_10, VALUE_11, VALUE_12, VALUE_13
                , VALUE_14, VALUE_15, VALUE_16, VALUE_17, VALUE_18, VALUE_19, VALUE_20, VALUE_21, VALUE_22, VALUE_23, VALUE_24, VALUE_25
                FROM PLANNING_GENERAL_ADMINISTRATIVE_CODE A, PLANNING_GENERAL_ADMINISTRATIVE_DTL B
                WHERE A.SCODE = B.SCODE(+)
                AND A.YEAR = B.YEAR(+)
                AND A.YEAR = :year
                ORDER BY A.IDX`;                 

  const binds = {year: year};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
