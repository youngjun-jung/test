// dbconfig.js
require('dotenv').config();

const oracledb = require('oracledb');

const oracleUser = process.env.ORACLE_USER;
const oraclePassword = process.env.ORACLE_PASSWORD;
const connectString = process.env.ORACLE_CONNECT_STRING;

console.log(connectString);

// 풀 설정 추가
const poolConfig = {
  user: oracleUser,
  password: oraclePassword,
  connectString: connectString,
  poolMin: 2,          // 최소 풀 크기
  poolMax: 5,          // 최대 풀 크기
  poolIncrement: 1,    // 풀 증가 단위
  poolTimeout: 60,     // 커넥션 획득 대기 시간(초)
  idleTimeout: 120     // 유휴 커넥션 자동 종료 시간(초) → 2분 설정
};

console.log(poolConfig);

// 풀 생성
async function initializePool() {
  try {
    await oracledb.createPool(poolConfig);
    console.log('오라클 풀 생성 완료');
  } catch (err) {
    console.error('풀 생성 실패:', err);
  }
}

module.exports = {
  poolConfig,
  initializePool
};
