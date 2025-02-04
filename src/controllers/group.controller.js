const { executeQuery } = require('../config/queries');

  // 사용자 조회 로직
exports.getGroup = async (req, res) => {
 
   const receivedData = req.query;

   const id = receivedData.id;

   const query = `SELECT A.GROUPID, A.GROUPNAME
                  FROM ADM_GROUP A
                  WHERE STAT = 'Y' 
                  AND A.GROUPID LIKE :groupid
                  ORDER BY A.GROUPID`;

  const binds = {groupid: id};
  
    try {
      const data = await executeQuery(query, binds); // 데이터 조회
      res.json({ success: true, data }); // JSON 형식으로 응답

    } catch (err) {
      res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
    }
  };