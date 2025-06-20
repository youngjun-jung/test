const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/backuprec.procedure');
const logger = require('../../logger'); 

// 비즈니스 로직
exports.postBackuprecchk = async (req, res) => { 
  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    const backupid = receivedData.backup_id;
    const recoveryid = receivedData.recoveryid;
    const gubun = receivedData.gubun;
    const gubun1 = receivedData.gubun1;
    const gubun2 = receivedData.gubun2;
    const zinc_cnt = receivedData.zinc_cnt;

    logger.info(`req backupid : ${backupid}`);
    logger.info(`req recoveryid : ${recoveryid}`);
    logger.info(`req gubun : ${gubun}`);
    logger.info(`req gubun1 : ${gubun1}`);
    logger.info(`req gubun2 : ${gubun2}`);
    logger.info(`req zinc_cnt : ${zinc_cnt}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callBackuprecproc(backupid, recoveryid, gubun, gubun1, gubun2, zinc_cnt);

    //logger.info(`req data : ${JSON.stringify(data, null, 2)}`);

    if (!data || Object.keys(data).length === 0) {
      logger.error('[404]Error calling stored procedure:', error);
      res.status(404).json({ success: false, message: '[오류]처리 실패', error: 'Procedure proc error' });
    }

    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    logger.error('[500]Error calling stored procedure:', err);
    res.status(500).json({ success: false, message: '[오류]처리 실패', error: err.message });
  }
 };
