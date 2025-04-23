const { executeQuery } = require('../config/queries');
const logger = require('../../logger'); 

  // 버전 조회 로직
exports.getVersionCheck = async (req, res) => {
   const receivedData = req.query;

   const appVer = receivedData.appver;

   const query = `SELECT
                  GUBUN,
                  FILEID,
                  FILESIZE,
                  VER
              FROM TB_UPDATE_YP A
              WHERE TO_NUMBER(REPLACE(VER, '.', '')) = (
                  SELECT MAX(TO_NUMBER(REPLACE(VER, '.', '')))
                  FROM TB_UPDATE_YP B
                  WHERE A.FILEID = B.FILEID AND A.GUBUN = B.GUBUN
              )
              AND TO_NUMBER(REPLACE(VER, '.', '')) > TO_NUMBER(REPLACE(:APPVERSION, '.', ''))
              ORDER BY GUBUN DESC, FILEID`;

  const binds = {appVersion: appVer};
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회

      const reformData = data.reduce((acc, curr) => {
        const { GUBUN, FILEID, FILESIZE, VER } = curr;
        if (!acc[GUBUN]) { // gubun이 존재하지 않으면 태그 추가
          acc[GUBUN] = [];
        }
        acc[GUBUN].push({ fileid: FILEID, filesize: FILESIZE, ver: VER });
        return acc;
      }, {});

      logger.info(`res data : ${JSON.stringify(reformData)}`);
      res.json({ success: true, reformData }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };


