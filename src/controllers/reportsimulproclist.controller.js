const { executeQuery } = require('../config/queries');
const logger = require('../../logger'); 

  // 리포트 시나리오 조회
exports.getReportSimulProclist = async (req, res) => {
   const receivedData = req.query;

   const year = receivedData.year;
   const scode = receivedData.scode;
   
   const query = `
    SELECT A.GUBUN AS GROUPSET, A.GUBUN||'-'||TO_CHAR(A.IDX, 'FM00') AS SCENCODE, A.BACKUP_ID, B.COMMENTS, B.TIMEMARK, B.PROCID, A.IDX
    FROM LIST_PLAN_SCENARIO A, PLAN_BACKUP B
    WHERE A.BACKUP_ID = B.BACKUP_ID
        AND A.YEAR = :YEAR
        AND A.SCODE = :SCODE
    ORDER BY A.GUBUN, A.IDX`;

    const binds = {year: year, scode: scode};

    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답
  
    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
   
  };


