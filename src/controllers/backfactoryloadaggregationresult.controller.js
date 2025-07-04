const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getBackfactoryloadaggregationresultchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const case_id = receivedData.case_id;
  const backup_id = receivedData.backup_id;

  console.log("backup_id: ", backup_id);
  console.log("procid: ", procid);

  query = `SELECT CASE_ID, CASE_COMMENT, YEAR, MONTH, BUHA
          , WEEK_F1, KA_W_F1, SAT_F1, KA_S_F1, HOL_F1, KA_H_F1, DAY_COUNT_FAC1, OP_TIME_FAC1, KA_FAC1, CD_FAC1, CV_FAC1, PROD_QTY_FAC1, POWER_USAGE_FAC1, UC_FAC1
          , WEEK_F2, KA_W_F2, SAT_F2, KA_S_F2, HOL_F2, KA_H_F2, DAY_COUNT_FAC2, OP_TIME_FAC2, KA_FAC2, CD_FAC2, CV_FAC2, PROD_QTY_FAC2, POWER_USAGE_FAC2, UC_FAC2
          FROM FACTORY_LOAD_AGGREGATION_RESULT X
          WHERE X.CASE_ID IN (SELECT CASE_ID FROM BACKUP_PLAN_NEW_ELEC_RECTIFIER_CHK WHERE BACKUP_ID = :backup_id)
          ORDER BY X.MONTH, DECODE(BUHA, 'NT', 1, 'DT', 2, 'PT', 3)`; 

  binds = {backup_id: backup_id};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
