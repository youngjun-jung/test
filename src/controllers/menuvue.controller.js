const { executeQuery } = require('../config/queries');
const executeProcedure = require('../procedures/menuvue.procedure');
const logger = require('../../logger'); 

// 로그인 관련 비즈니스 로직
exports.getMenuchk = async (req, res) => {

    try {
    // 요청 본문에서 JSON 데이터 추출
    const receivedData = req.query;

    //logger.info(JSON.stringify(receivedData, null, 2));

    const type = receivedData.type;
    const userid = receivedData.userid;

    logger.info(`req type : ${type}`);
    logger.info(`req userid : ${userid}`);

    // 저장 프로시저 호출
    const data = await executeProcedure.callMenuvueproc(userid, type);

    //logger.info(`${JSON.stringify({ data }, null, 2)}`);

    if (!data || Object.keys(data).length === 0) {
      logger.error('[404]Error Menu not found');
      res.json({ success: false, message: '메뉴 정보 없음', error: 'Procedure Error' });
    }
    else {
      res.json( data ); // JSON 형식으로 응답
    }

  } catch (err) {
    logger.error('[500]Error calling stored procedure:', err);
    res.status(500).json({ success: false, message: 'API 조회 실패', error: err.message });
  }
 };
/*
   const jyj = [
  {
    "type": "group",
    "title": "그룹명1",
    "children": [
      {
        "title": "메뉴1",
        "icon": "mdi-home",
        "route": "/home"
      },
      {
        "title": "메뉴2",
        "icon": "mdi-account",
        "route": "/home"
      }
    ]
  },
  {
    "type": "divider"
  },
  {
    "type": "group",
    "title": "그룹명2",
    "children": [
      {
        "title": "메뉴3",
        "icon": "mdi-settings",
        "route": "/home"
      }
    ]
  }
]

  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      logger.info(`req data : ${JSON.stringify({ jyj }, null, 2)}`);
      res.json({ jyj }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };

  */
