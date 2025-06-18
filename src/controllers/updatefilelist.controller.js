const { executeQuery } = require('../config/queries');
const logger = require('../../logger'); 

  // 업데이트 파일 조회 로직
exports.getUpdateFileList = async (req, res) => {
   const receivedData = req.query;

   const rversion = receivedData.rversion;
   const ridx = receivedData.ridx;

   const query = `
   SELECT 
    GUBUN,
    FILEID,
    FILESIZE,
    VER, 
    CREATED_DT,
    MODIFIED_DT,
    RIDX
FROM (
    SELECT A.*,
           ROW_NUMBER() OVER (
               PARTITION BY FILEID
               ORDER BY VER DESC, RIDX DESC
           ) AS RN
      FROM TB_UPDATE_YP A
     WHERE VER > :rversion OR (VER = :rversion AND RIDX > :ridx)
)
WHERE RN = 1
ORDER BY RIDX, MODIFIED_DT`;

  const binds = {rversion: rversion, ridx: ridx};
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회

      const reformData = data.reduce((acc, curr) => {
        const { GUBUN, FILEID, FILESIZE, VER, CREATED_DT, MODIFIED_DT, RIDX } = curr;
        if (!acc[GUBUN]) { // gubun이 존재하지 않으면 태그 추가
          acc[GUBUN] = [];
        }
        acc[GUBUN].push({ fileid: FILEID, filesize: FILESIZE, ver: VER, created_dt: CREATED_DT, modified_dt: MODIFIED_DT, ridx: RIDX });
        return acc;
      }, {});

      logger.info(`res data : ${JSON.stringify(reformData)}`);
      res.json({ success: true, reformData }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };


