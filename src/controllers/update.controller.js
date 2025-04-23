//const config = require('../config/envConfig'); // 환경변수 모듈 (2 depth)
const { executeQuery } = require('../config/queries');
const fs = require('fs');
const path = require('path');

  // 파일 업데이트 비즈니스 로직
  exports.getUpdate = async (req, res) => {
    const { gubun } = req.params;
    const receivedData = req.query;

    const ip = receivedData.ip;
    const userId = receivedData.userid;
    const fileId = receivedData.fileid; 
    const fileVersion = receivedData.filever;
    const updatePath_yp = "/pbPackage/yp/";
    const updatePath_res ="/pbPackage/res/";
    //const { userid, fileid, filever } = receivedData;

    console.log(`ip: ${ip}, userId: ${userId}, gubun: ${gubun}, fileName: ${fileId}, version: ${fileVersion}`);

    //const prefixPath = ( gubun === 'YP' ) ? config.UPDATE.PATH_YP + fileVersion + "/":  config.UPDATE.PATH_RES + fileVersion + "/";
    const prefixPath = ( gubun === 'YP' ) ? updatePath_yp + fileVersion + "/":  updatePath_res + fileVersion + "/";

    const filePath = path.join(process.cwd(), prefixPath, fileId); 
    console.log('filePath: ', filePath);

    // 파일 존재 여부 체크
    if(!fs.existsSync(filePath)){
      return res.status(404).json({ success: false, message: `File not found - ${fileId}`, error: 'File not found' });
    }

    // 파일 정보 로드 - 필요?
    const stat = fs.statSync(filePath);
    
    const fileSize = stat.size;

    let resFlag = '';

    // res.download를 Promise로 감싸기(파일 처리 후 결과를 기준해서 로그 기록을 하기 위해)
    const downloadPromise = new Promise((resolve, reject) => {
      res.download(filePath, fileId, (err) => {
        if (err) {
          console.error('Failed download: ', err);
          resFlag = 'F';
          // 다운로드 실패 시 에러 응답 전송
          res.status(500).json({ success: false, message: `Failed download - ${fileId}`, error: 'Failed download file' });
          return reject(err);
        } else {
          console.info(`Succeed download - ${fileId}(ver: ${fileVersion})`);
          resFlag = 'Y';
          return resolve();
        }
      });
    });

    try {
      // 다운로드가 완료될 때까지 대기
      await downloadPromise;

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

      const result = await executeQuery(query, binds);
      console.log('Succeed log insert count: ', result);
    } catch (err) {
      console.error('Failed log insert', err);
    }

  };