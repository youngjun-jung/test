const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getPlanlaborzincchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;

  console.log("year: ", year);

  const query = `SELECT A.YEAR, A.SCODE, A.USE_YN, SUM(MG_VALUE + IM_VALUE) MG_VALUE, SUM(PD_VALUE) PD_VALUE
                FROM PLAN_LABOR_ZINC_CODE A, PLAN_LABOR_ZINC_DTL B
                WHERE A.YEAR = B.YEAR(+)
                AND A.SCODE = B.MCODE(+)
                AND A.YEAR = :year
                GROUP BY A.YEAR, A.SCODE, A.USE_YN, A.IDX
                ORDER BY A.IDX`;                 

 const binds = {year: year};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
