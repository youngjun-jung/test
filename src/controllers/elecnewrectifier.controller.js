const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getElecnewrectifierchk = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const procid = receivedData.procid;

  console.log("year: ", year);
  console.log("procid: ", procid);

  query = `SELECT :year YEAR, MONTH
          , SUBSTR(SCODE, 8, 1) SCODE
          , SUM(DECODE(SCODE, 'PNERC90101', VALUE, 0)) TOT_1
          , SUM(DECODE(SCODE, 'PNERC90102', VALUE, 0)) TOT_2
          , SUM(DECODE(SCODE, 'PNERC90103', VALUE, 0)) TOT_3
          , SUM(DECODE(SCODE, 'PNERC10101', VALUE, 0)) NT_1
          , SUM(DECODE(SCODE, 'PNERC10102', VALUE, 0)) NT_2
          , SUM(DECODE(SCODE, 'PNERC10103', VALUE, 0)) NT_3
          , DECODE(SUM(DECODE(SCODE, 'PNERC90103', VALUE, 0)), 0, 0, SUM(DECODE(SCODE, 'PNERC10103', VALUE, 0)) / SUM(DECODE(SCODE, 'PNERC90103', VALUE, 0))) NT_RATE
          , SUM(DECODE(SCODE, 'PNERC20101', VALUE, 0)) DT_1
          , SUM(DECODE(SCODE, 'PNERC20102', VALUE, 0)) DT_2
          , SUM(DECODE(SCODE, 'PNERC20103', VALUE, 0)) DT_3
          , SUM(DECODE(SCODE, 'PNERC30101', VALUE, 0)) PT_1
          , SUM(DECODE(SCODE, 'PNERC30102', VALUE, 0)) PT_2
          , SUM(DECODE(SCODE, 'PNERC30103', VALUE, 0)) PT_3
          , (SELECT DECODE(A.MONTH, '01', MONTH_01, '02', MONTH_02, '03', MONTH_03, '04', MONTH_04, '05', MONTH_05, '06', MONTH_06
                                  , '07', MONTH_07, '08', MONTH_08, '09', MONTH_09, '10', MONTH_10, '11', MONTH_11, '12', MONTH_12, 0)
            FROM PLAN_NEW_ELEC_RECTIFIER_PLUG
            WHERE YEAR = :year
            AND SCODE = 'PNERPC002'
            AND PROCID = :procid
            ) ONE_F_RATE   
          , (SELECT DECODE(A.MONTH, '01', MONTH_01, '02', MONTH_02, '03', MONTH_03, '04', MONTH_04, '05', MONTH_05, '06', MONTH_06
                                  , '07', MONTH_07, '08', MONTH_08, '09', MONTH_09, '10', MONTH_10, '11', MONTH_11, '12', MONTH_12, 0)
            FROM PLAN_NEW_ELEC_RECTIFIER_PLUG_MANUAL
            WHERE YEAR = :year
            AND SCODE = 'PERPM001'
            AND PROCID = :procid
            ) ONE_F
          , (SELECT DECODE(A.MONTH, '01', MONTH_01, '02', MONTH_02, '03', MONTH_03, '04', MONTH_04, '05', MONTH_05, '06', MONTH_06
                                  , '07', MONTH_07, '08', MONTH_08, '09', MONTH_09, '10', MONTH_10, '11', MONTH_11, '12', MONTH_12, 0)
            FROM PLAN_NEW_ELEC_RECTIFIER_PLUG_MANUAL
            WHERE YEAR = :year
            AND SCODE = 'PERPM002'
            AND PROCID = :procid
            ) ONE_RATE   
          , (SELECT DECODE(A.MONTH, '01', MONTH_01, '02', MONTH_02, '03', MONTH_03, '04', MONTH_04, '05', MONTH_05, '06', MONTH_06
                                  , '07', MONTH_07, '08', MONTH_08, '09', MONTH_09, '10', MONTH_10, '11', MONTH_11, '12', MONTH_12, 0)
            FROM PLAN_NEW_ELEC_RECTIFIER_PLUG
            WHERE YEAR = :year
            AND SCODE = 'PNERPC001'
            AND PROCID = :procid
            ) ONE_RATE_T                          
          FROM (
                SELECT '01' MONTH, SCODE, MONTH_01 VALUE FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '02' MONTH, SCODE, MONTH_02 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '03' MONTH, SCODE, MONTH_03 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '04' MONTH, SCODE, MONTH_04 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '05' MONTH, SCODE, MONTH_05 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '06' MONTH, SCODE, MONTH_06 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '07' MONTH, SCODE, MONTH_07 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '08' MONTH, SCODE, MONTH_08 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '09' MONTH, SCODE, MONTH_09 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '10' MONTH, SCODE, MONTH_10 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '11' MONTH, SCODE, MONTH_11 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '12' MONTH, SCODE, MONTH_12 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                ) A
          WHERE SUBSTR(SCODE, 8, 1) = '1'     
          GROUP BY MONTH, SUBSTR(SCODE, 8, 1)
          UNION ALL
          SELECT :year YEAR, MONTH
          , SUBSTR(SCODE, 8, 1) SCODE
          , SUM(DECODE(SCODE, 'PNERC90201', VALUE, 0)) TOT_1
          , SUM(DECODE(SCODE, 'PNERC90202', VALUE, 0)) TOT_2
          , SUM(DECODE(SCODE, 'PNERC90203', VALUE, 0)) TOT_3
          , SUM(DECODE(SCODE, 'PNERC10201', VALUE, 0)) NT_1
          , SUM(DECODE(SCODE, 'PNERC10202', VALUE, 0)) NT_2
          , SUM(DECODE(SCODE, 'PNERC10203', VALUE, 0)) NT_3
          , DECODE(SUM(DECODE(SCODE, 'PNERC90203', VALUE, 0)), 0, 0, SUM(DECODE(SCODE, 'PNERC10203', VALUE, 0)) / SUM(DECODE(SCODE, 'PNERC90203', VALUE, 0))) NT_RATE
          , SUM(DECODE(SCODE, 'PNERC20201', VALUE, 0)) DT_1
          , SUM(DECODE(SCODE, 'PNERC20202', VALUE, 0)) DT_2
          , SUM(DECODE(SCODE, 'PNERC20203', VALUE, 0)) DT_3
          , SUM(DECODE(SCODE, 'PNERC30201', VALUE, 0)) PT_1
          , SUM(DECODE(SCODE, 'PNERC30202', VALUE, 0)) PT_2
          , SUM(DECODE(SCODE, 'PNERC30203', VALUE, 0)) PT_3
          , (SELECT DECODE(A.MONTH, '01', MONTH_01, '02', MONTH_02, '03', MONTH_03, '04', MONTH_04, '05', MONTH_05, '06', MONTH_06
                                  , '07', MONTH_07, '08', MONTH_08, '09', MONTH_09, '10', MONTH_10, '11', MONTH_11, '12', MONTH_12, 0)
            FROM PLAN_NEW_ELEC_RECTIFIER_PLUG
            WHERE YEAR = :year
            AND SCODE = 'PNERPC102'
            AND PROCID = :procid
            ) ONE_F_RATE   
          , (SELECT DECODE(A.MONTH, '01', MONTH_01, '02', MONTH_02, '03', MONTH_03, '04', MONTH_04, '05', MONTH_05, '06', MONTH_06
                                  , '07', MONTH_07, '08', MONTH_08, '09', MONTH_09, '10', MONTH_10, '11', MONTH_11, '12', MONTH_12, 0)
            FROM PLAN_NEW_ELEC_RECTIFIER_PLUG_MANUAL
            WHERE YEAR = :year
            AND SCODE = 'PERPM101'
            AND PROCID = :procid
            ) ONE_F
          , (SELECT DECODE(A.MONTH, '01', MONTH_01, '02', MONTH_02, '03', MONTH_03, '04', MONTH_04, '05', MONTH_05, '06', MONTH_06
                                  , '07', MONTH_07, '08', MONTH_08, '09', MONTH_09, '10', MONTH_10, '11', MONTH_11, '12', MONTH_12, 0)
            FROM PLAN_NEW_ELEC_RECTIFIER_PLUG_MANUAL
            WHERE YEAR = :year
            AND SCODE = 'PERPM102'
            AND PROCID = :procid
            ) ONE_RATE   
          , (SELECT DECODE(A.MONTH, '01', MONTH_01, '02', MONTH_02, '03', MONTH_03, '04', MONTH_04, '05', MONTH_05, '06', MONTH_06
                                  , '07', MONTH_07, '08', MONTH_08, '09', MONTH_09, '10', MONTH_10, '11', MONTH_11, '12', MONTH_12, 0)
            FROM PLAN_NEW_ELEC_RECTIFIER_PLUG
            WHERE YEAR = :year
            AND SCODE = 'PNERPC101'
            AND PROCID = :procid
            ) ONE_RATE_T                          
          FROM (
                SELECT '01' MONTH, SCODE, MONTH_01 VALUE FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '02' MONTH, SCODE, MONTH_02 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '03' MONTH, SCODE, MONTH_03 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '04' MONTH, SCODE, MONTH_04 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '05' MONTH, SCODE, MONTH_05 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '06' MONTH, SCODE, MONTH_06 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '07' MONTH, SCODE, MONTH_07 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '08' MONTH, SCODE, MONTH_08 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '09' MONTH, SCODE, MONTH_09 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '10' MONTH, SCODE, MONTH_10 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '11' MONTH, SCODE, MONTH_11 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                UNION ALL SELECT '12' MONTH, SCODE, MONTH_12 FROM PLAN_NEW_ELEC_RECTIFIER WHERE YEAR = :year AND PROCID = :procid 
                ) A
          WHERE SUBSTR(SCODE, 8, 1) = '2'     
          GROUP BY MONTH, SUBSTR(SCODE, 8, 1)
          ORDER BY MONTH, SCODE`; 

  binds = {year: year, procid: procid};                       
  
  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
