const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/planbackupdelete.procedure');
const logger = require('../../logger'); 

// 비즈니스 로직
exports.postPlanbackupdeletechk = async (req, res) => { 
  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    const backupid = receivedData.backup_id;
    const deleteid = receivedData.deleteid;
    const gubun = receivedData.gubun;

    logger.info(`req backupid : ${backupid}`);
    logger.info(`req deleteid : ${deleteid}`);
    logger.info(`req gubun : ${gubun}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callPlanbackupdeleteproc(backupid, deleteid, gubun);

    //logger.info(`req data : ${JSON.stringify(data, null, 2)}`);

    if (!data || Object.keys(data).length === 0) {
      logger.error('[404]Error calling stored procedure:', error);
      res.status(404).json({ success: false, message: '데이터 조회 실패', error: 'not found' });
    }

    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    logger.error('[500]Error calling stored procedure:', err);
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
 };
