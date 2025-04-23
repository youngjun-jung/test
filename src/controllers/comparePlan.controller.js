const { executeQuery, executeQueryMany } = require('../config/queries');
const logger = require('../../logger'); 

  // 비즈니스 로직
exports.getTargetPlan = async (req, res) => {

  // 요청 본문에서 JSON 데이터 추출
  const receivedData = req.query;

  const year = receivedData.year;
  const backupId = receivedData.backupid;

  console.log("year: ", year);
  console.log("backupId: ", backupId);

  const query = `
SELECT *
FROM (
    SELECT DECODE(A.XB, '정광', 1, '산화아연', 2, '캐소드생산', 3, '아연괴생산', 4, '황산생산', 5, 'Conven.Cake생산', 6, 'Conven.Cake투입', 7) as num, 
        CASE 
            WHEN A.XB  IN ('정광', '산화아연') THEN '주원료'
            ELSE '생산'
        END AS GUBUN1
        , CASE 
            WHEN A.XB IN ('캐소드생산', '아연괴생산') THEN '아연'
            WHEN A.XB IN ('Conven.Cake생산', 'Conven.Cake투입') THEN 'Cake'
            WHEN A.XB = '황산생산' THEN '황산'
            ELSE A.XB
        END AS GUBUN2 
        , DECODE(A.XB, '캐소드생산', 'Cathod', '아연괴생산', 'Ingot', '황산생산', '생산량', 'Conven.Cake생산', '생산량', 'Conven.Cake투입', '투입량', A.XB) AS GUBUN3
        , ROUND((FN_REF_CAL(A.XB, A.YEAR, '01', A.AUTO_YN, ROUND(XD, 2))        
        + FN_REF_CAL(A.XB, A.YEAR, '02', A.AUTO_YN, ROUND(XE, 2))       
        + FN_REF_CAL(A.XB, A.YEAR, '03', A.AUTO_YN, ROUND(XF, 2))       
        + FN_REF_CAL(A.XB, A.YEAR, '04', A.AUTO_YN, ROUND(XH, 2))       
        + FN_REF_CAL(A.XB, A.YEAR, '05', A.AUTO_YN, ROUND(XI, 2))       
        + FN_REF_CAL(A.XB, A.YEAR, '06', A.AUTO_YN, ROUND(XJ, 2))       
        + FN_REF_CAL(A.XB, A.YEAR, '07', A.AUTO_YN, ROUND(XL, 2))       
        + FN_REF_CAL(A.XB, A.YEAR, '08', A.AUTO_YN, ROUND(XM, 2))       
        + FN_REF_CAL(A.XB, A.YEAR, '09', A.AUTO_YN, ROUND(XN, 2))       
        + FN_REF_CAL(A.XB, A.YEAR, '10', A.AUTO_YN, ROUND(XP, 2))       
        + FN_REF_CAL(A.XB, A.YEAR, '11', A.AUTO_YN, ROUND(XQ, 2))       
        + FN_REF_CAL(A.XB, A.YEAR, '12', A.AUTO_YN, ROUND(XR, 2))), 0) AS SUMVALUE      
    FROM BACKUP_PLAN_REF_AUTO_CODE A, BACKUP_PLUG B
    WHERE A.XB = B.XB(+)
        AND A.YEAR = B.YEAR(+)
        AND A.BACKUP_ID = B.BACKUP_ID
        AND A.USE_YN = 'Y'
        AND A.XB in ('정광', '산화아연', '캐소드생산', '아연괴생산', '황산생산', 'Conven.Cake생산', 'Conven.Cake투입')
        AND A.YEAR = :year
        AND A.BACKUP_ID = :backupid
    UNION ALL
    -- 매출액은 어디서?
    SELECT 8 AS NUM, '' AS GUBUN1, '' AS GUBUN2, '매출액' AS GUBUN3 
    , ROUND(NVL(MONTH_0, 0) / 100000, 0) SUMVALUE 
    FROM PLANNING_SALES_CODE A, PLANNING_SALES B
    WHERE A.SCODE = B.SCODE(+)
        AND A.YEAR = B.YEAR(+)
        AND A.YEAR = :year
        AND A.USE_YN = 'Y'
        AND A.SCODE = 'PNNS104'
    UNION ALL
    -- 제조원가
    SELECT CASE 
            WHEN Z.GUBUN3 = '정광外' THEN 9
            WHEN Z.GUBUN3 = '자가소비' THEN 10
            WHEN Z.GUBUN3 = '무연탄' THEN 11
            WHEN Z.GUBUN2 = '부원료' AND Z.GUBUN3 = '기타' THEN 12
            WHEN Z.GUBUN3 = '극판,보조재료' THEN 13
            WHEN Z.GUBUN3 = '노무비(직영)' THEN 14
            WHEN Z.GUBUN3 = '정류기' THEN 15
            WHEN Z.GUBUN3 = '일반동력' THEN 16
            WHEN Z.GUBUN3 = '감가상각비' THEN 17
            WHEN Z.GUBUN3 = '수선비' THEN 18
            WHEN Z.GUBUN3 = '운임, 임차' THEN 19
            WHEN Z.GUBUN3 = '복리후생비' THEN 20
            WHEN Z.GUBUN3 = '지급수수료' THEN 21
            WHEN Z.GUBUN2 = '기타경비' AND Z.GUBUN3 = '기타' THEN 22
            WHEN Z.GUBUN2 = '공제' AND Z.GUBUN3 = '부산물공제' THEN 23
          END AS NUM, Z.*
    FROM (
--        SELECT '제조원가' AS GUBUN1, DECODE(MNAME, '직영', '노무비(직영)', MNAME) AS GUBUN2, GUBUN3, ROUND(SUM(NVL(DB0103,0))/10000, 0) AS SUMVALUE
        SELECT '제조원가' AS GUBUN1, DECODE(MNAME, '직영', '노무비(직영)', MNAME) AS GUBUN2, GUBUN3, SUM(NVL(DB0103,0))/10000 AS SUMVALUE
        FROM (
            SELECT
                X.MNAME, A.DB0103,
                CASE 
                    -- 주원료 : 임가공연회, 타지금, Pb Ingot, 재생아연괴, 아연말용Cathode
                    WHEN X.SCODE IN ('AA010103', 'AA010104', 'AA010105', 'AA010106', 'AA010107') THEN '정광外'
                    -- 부원료 : '자가아연말', '황산', '황산동', 'Cu.Cake(생산)', 'Cu Speiss(분)', 'Conven.Cake'
                    WHEN X.SCODE IN ('AA010212','AA010213','AA010214', 'AA010215','AA010216','AA010221') THEN '자가소비'
                    -- 부원료
                    WHEN X.SCODE = 'AA010210' THEN '무연탄'
                    -- 보조재료비
                    WHEN X.SCODE LIKE 'AA0103__' THEN '극판,보조재료'
                    -- 노무비(직영) : 임원급여, 급여, 연월차수당, 상여금, 제수당, 퇴직급여
                    WHEN X.SCODE IN ('AA020101', 'AA020102', 'AA020103', 'AA020104', 'AA020105', 'AA020106') THEN '노무비(직영)'
                    -- 전력비
                    WHEN X.SCODE = 'AA030102' THEN '정류기'
                    -- 전력비 : 직접부문, 보조부문
                    WHEN X.SCODE IN ('AA030101', 'AA030103') THEN '일반동력'
                    -- 기타경비 
                    WHEN X.SCODE = 'AA030202' THEN '감가상각비'
                    -- 기타경비 
                    WHEN X.SCODE = 'AA030201' THEN '수선비'
                    -- 기탁여비 : 운임, 임차료 
                    WHEN X.SCODE IN ('AA030205', 'AA030208') THEN '운임, 임차'
                    -- 기타경비
                    WHEN X.SCODE = 'AA030209' THEN '복리후생비'
                    -- 기타경비 
                    WHEN X.SCODE = 'AA030220' THEN '지급수수료'                                    
                    -- 부산물공제
                    WHEN X.SCODE IN ('BB010102', 'BB010103', 'BB010104', 'BB010105', 'BB010106', 'BB010107', 'BB010108', 'BB010109'
                                    , 'BB010110', 'BB010111', 'BB010112', 'BB010113', 'BB010114', 'BB010115', 'BB010116', 'BB010117'
                                    , 'BB010118', 'BB010119')THEN '부산물공제'  
                    ELSE '기타'
                END AS GUBUN3
            FROM PLAN_PRODUCTS_CODE X, PLAN_PRODUCTS_TOT A
            WHERE X.SCODE = A.SCODE(+)
                AND X.YEAR  = A.YEAR(+)
                AND A.MONTH(+) = '00'
                AND X.YEAR  = :year
        --        AND X.MNAME = '부원료'
                AND X.SNAME <> '합계'
                AND X.PLAN = 'Y'
                AND X.SCODE NOT IN ('AA010101','AA010102', 'AA020201', 'AA020202', 'AA0202', 'AA02', 'BB010101', 'CC01', 'DD010101', 'DD010102', 'EE01')
        )
        GROUP BY MNAME, GUBUN3
    ) Z
    UNION ALL
    -- 판관비(판매비)
    SELECT DECODE(GUBUN, '황산 판매비', 25, 24) AS NUM, '판관비' AS GUBUN1,  '판매비' AS GUBUN2, GUBUN AS GUBUN3, SUM(CALC)/100000 AS SUMVALUE
    FROM (      
        SELECT DECODE(A.LNAME, '황산제품', '황산', '아연괴外') AS GUBUN, SUM(NVL(MONTH_0, 0)) AS CALC
        FROM PLANNING_SELLING_EXPENSES_CODE A, PLANNING_SELLING_EXPENSES B
        WHERE A.SCODE = B.SCODE(+)
            AND A.YEAR = B.YEAR(+)
            AND A.YEAR = :YEAR
            AND A.USE_YN = 'Y'
            AND A.LNAME NOT IN ('총', '부산물')
            AND A.SNAME = '금액'
            AND ( A.MNAME = '합계' OR  A.LNAME IN ('전기동', '석고', '슬래그') )
        GROUP BY A.LNAME              
    ) 
    GROUP BY GUBUN    
    UNION ALL
    -- 판관비(일반관리비)
    SELECT 26, '판관비' AS GUBUN1,  '관리비' AS GUBUN2, '일반' AS GUBUN3, VALUE_21/100000
    FROM PLANNING_GENERAL_ADMINISTRATIVE_CODE A, PLANNING_GENERAL_ADMINISTRATIVE_DTL B
    WHERE A.SCODE = B.SCODE(+)
        AND A.YEAR = B.YEAR(+)
        AND A.YEAR = :year
        and A.SNAME = '총계'
    UNION ALL
    -- 영업이익
    SELECT 27, '영업이익' AS GUBUN1,  '감가상각비' AS GUBUN2, '포함' AS GUBUN3, 0
    FROM DUAL
    UNION ALL
    -- 영업이익
    SELECT 27, '영업이익' AS GUBUN1,  '감가상각비' AS GUBUN2, '제외' AS GUBUN3, 0
    FROM DUAL                    
)
ORDER BY NUM`;                 

   const binds = {year: year, backupid: backupId};

  try {
    const data = await executeQuery(query, binds); // 데이터 조회
    res.json({ success: true, data }); // JSON 형식으로 응답

  } catch (err) {
    res.status(500).json({ success: false, message: '데이터 조회 실패', error: err.message });
  }
};
