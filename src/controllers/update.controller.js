const { executeQuery } = require('../config/queries');
const path = require('path');

  // 파일 업데이트 비즈니스 로직
  exports.getUpdate = (req, res) => {

    const receivedData = req.query;

    const fileName = receivedData.fileName; // 다운로드할 파일 이름

    console.log('fileName: ', fileName);

    const filePath = path.join('/', '../vscode/yp/download', fileName); // 파일 경로

    console.log('filePath: ', filePath);
  
    res.download(filePath, fileName, (err) => {  
      if (err) {
        console.error('File download error:', err);
        res.status(500).json({ success: false, message: 'Error downloading the file', error: err.message });
      }
      else{
        console.log('File download success');
/*
        // 데이터베이스 업데이트 쿼리 실행
        const updateQuery = `UPDATE adm_file SET state = 'Y' WHERE file_name = ?`;

        executeQuery(updateQuery, [fileName])
        .then((result) => {
          console.log('Database updated successfully:', result);
        })
        .catch((dbError) => {
          console.error('Database update error:', dbError);
        });
        */
      }     
    });
  };
