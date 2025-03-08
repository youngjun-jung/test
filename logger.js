const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const path = require('path');

// 로그 디렉토리 설정
const logDir = 'logs'; // 로그 파일이 저장될 디렉토리

// 로그 포맷 정의
const { combine, timestamp, printf, colorize } = winston.format;
const logFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level.toUpperCase()}] ${message}`;
});

// Winston 로거 생성
const logger = winston.createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // 타임스탬프 추가
    logFormat // 커스텀 포맷 적용
  ),
  transports: [
    // 콘솔 출력 설정
    new winston.transports.Console({
      level: 'debug', // 콘솔에는 debug 레벨 이상 출력
      format: combine(
        colorize(), // 레벨별 색상 추가
        logFormat
      ),
    }),
    // 파일 출력 설정 (날짜별 회전)
    new winstonDaily({
      level: 'info', // 파일에는 info 레벨 이상 출력
      datePattern: 'YYYY-MM-DD', // 날짜 형식
      dirname: path.join(__dirname, logDir), // 로그 파일 저장 경로
      filename: `%DATE%.log`, // 로그 파일 이름 (%DATE%는 datePattern에 따라 변경됨)
      maxFiles: '14d', // 14일치 로그 파일 보관
      zippedArchive: true, // 오래된 로그를 압축하여 저장
    }),
  ],
});

/*
// 테스트용 로그 작성
logger.info('서버가 시작되었습니다.');
logger.warn('경고 메시지입니다.');
logger.error('에러가 발생했습니다!');
logger.debug('디버그 메시지입니다.');
*/
module.exports = logger; // 다른 파일에서 사용할 수 있도록 로거를 내보냄