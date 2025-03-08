const { executeQuery } = require('../config/queries');
const logger = require('../../logger'); 

// 로그인 관련 비즈니스 로직
exports.getMenuchk = async (req, res) => {

    // 요청 본문에서 JSON 데이터 추출
    // const { param1, param2 } = req.query;
    const receivedData = req.query;

    const id = receivedData.id;

    const query = `SELECT A.USERID, P_MENUNAME, MENUNAME, P_MENUID, B.MENUID, NVL(SCREEN_ID, 'NOT') SCREEN_ID
                , MENU_FUN1||MENU_FUN2||MENU_FUN3||MENU_FUN4||MENU_FUN5||MENU_FUN6||MENU_FUN7||MENU_FUN8||MENU_FUN9 MENU_FUN
                    FROM ADM_USER_GRANTMENU A,   
                        ADM_MENU_CS B  
                  WHERE ( A.MENUID = B.MENUID ) 
                  AND  ( 
                          ( A.GRANTSTAT = '1' ) AND 
                          ( B.STATE = '1' ) AND  
                          ( B.MENU_DEPTH IN ('3')) AND   
                          ( A.USERID = :userid)
                      )    
                  ORDER BY MENUID DESC, MENU_SEQ DESC`;                 

   const binds = {userid: id};
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };

  
