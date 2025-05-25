const { executeQuery, executeQueryStream } = require('../config/queries');

  // 파일 업데이트 비즈니스 로직
  exports.getUpdate = async (req, res) => {
    const { gubun } = req.params;
    const receivedData = req.query;

    const ip = receivedData.ip;
    const userId = receivedData.userid;
    const fileId = receivedData.fileid; 
    const fileVersion = receivedData.filever;
    
    let connStream = null;
    let data = null;
    let fileSize = 0;
    let resFlag = 'F'; 

    console.log(`ip: ${ip}, userId: ${userId}, gubun: ${gubun}, fileName: ${fileId}, version: ${fileVersion}`);
    
    const query = `SELECT FILEID, FILEBLOB
                     FROM TB_UPDATE_YP
                    WHERE GUBUN = :gubun
                      AND FILEID = :fileId
                      AND VER = :fileVersion`; 

    const binds = {
      gubun: gubun,
      fileId: fileId,
      fileVersion: fileVersion
    };

    try {
      ({ connection: connStream, rows: data } = await executeQueryStream(query, binds)); // 데이터 조회

      if (!data || data.length === 0) {
        return res.status(404).json({ success: false, message: `File not found - ${fileId}` });
      }

      const { FILEID, FILEBLOB: fileblob } = data[0];

      if (!fileblob) {
        return res.status(404).json({ success: false, message: `File blob is null - ${fileId}` });
      }

      fileblob.on('data', (chunk) => {
        fileSize += chunk.length;
      });
  
      const downloadPromise = new Promise((resolve, reject) => {
        fileblob.on('end', resolve);
        fileblob.on('error', reject);
        res.on('error', reject);
      });
  
      res.status(200).set({
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${encodeURIComponent(FILEID)}"`
        });

      // 스트림 파이프프
      fileblob.pipe(res);

      //  완료될 때까지 await
      await downloadPromise;
      
      resFlag = 'S';

      if (connStream) {
        try {
          await connStream.close(); 
        } catch (closeErr) {
          logger.error('DB 연결 종료 실패:', closeErr);
        }
      }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: '처리 실패', error: err.message });
    } finally {
      await recordUpdateLog({ip, userId, gubun, fileId, fileVersion, fileSize, resFlag});
    }
  };

  async function recordUpdateLog({ ip, userId, gubun, fileId, fileVersion, fileSize, resFlag }) {
    const query = 
    `INSERT INTO LOG_UPDATE_HISTORY 
      (WORKDATE, IP, USERID, GUBUN, FILEID, 
      FILESIZE, VERSION, RESULT, UPDATE_DT)
    VALUES 
      (TO_CHAR(SYSDATE, 'YYYYMMDD'), :ip, :userId, :gubun, :fileId, 
      :fileSize, :fileVersion, :resFlag, SYSDATE)`;

    const binds = {
    ip: ip,
    userId: userId,         
    gubun: gubun,              
    fileId: fileId, 
    fileSize: fileSize,          
    fileVersion: fileVersion,     
    resFlag: resFlag              
    };

    try {
      const result = await executeQuery(query, binds);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed Insert LOG_UPDATE_HISTORY ', error: err.message });
    }
  }