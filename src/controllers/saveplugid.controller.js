const { executeQuery, executeQueryMany } = require('../config/queries');
const executeProcedure = require('../procedures/saveplugid.procedure');
const logger = require('../../logger'); 

 // 오류 정보 저장 로직
exports.postSaveplugidchk = async (req, res) => {

  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    const year = receivedData.year;
    const gubun = receivedData.gubun;
    const line = receivedData.line;
    const chk = receivedData.chk;
    const comments = receivedData.comments;
    const procid = receivedData.procid;

    logger.info(`req year : ${year}`);
    logger.info(`req gubun : ${gubun}`);
    logger.info(`req line : ${line}`);
    logger.info(`req chk : ${chk}`);
    logger.info(`req comments : ${comments}`);
    logger.info(`req procid : ${procid}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callSaveplugidproc(year, gubun, line, chk, comments, procid);

    logger.info(`req data : ${JSON.stringify(data, null, 2)}`);

    if (!data || Object.keys(data).length === 0) {
      res.status(404).json({ success: false, message: '[오류]처리 실패', error: 'Procedure proc error' });
    }

    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '[오류]처리 실패', error: err.message });
  }
 };
