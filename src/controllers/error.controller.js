const { executeQuery } = require('../config/queries');
const executeProcedure = require('../procedures/error.procedure');
const logger = require('../../logger'); 

  // 오류 정보 저장 로직
exports.postError = async (req, res) => {

  try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.body;

    const errnumber = receivedData.errnumber;
    const errmenu = receivedData.errmenu;
    const errobject = receivedData.errobject;
    const errevent = receivedData.errevent;
    const errline = receivedData.errline;
    const errtext = receivedData.errtext;
    const userid = receivedData.userid;

    logger.info(`req errnumber : ${errnumber}`);
    logger.info(`req errmenu : ${errmenu}`);
    logger.info(`req errobject : ${errobject}`);
    logger.info(`req errevent : ${errevent}`);
    logger.info(`req errline : ${errline}`);
    logger.info(`req errtext : ${errtext}`);
    logger.info(`req userid : ${userid}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callErrorproc(errnumber, errmenu, errobject, errevent, errline, errtext, userid);

    logger.info(`req data : ${JSON.stringify(data, null, 2)}`);

    if (!data || Object.keys(data).length === 0) {
      res.status(404).json({ success: false, message: '오류 정보 저장 실패', error: 'User insert error' });
    }

    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '오류 정보 저장 실패', error: err.message });
  }
 };
