require('dotenv').config();

const oracleUser = process.env.ORACLE_USER;
const oraclePassword = process.env.ORACLE_PASSWORD;
const connectString = process.env.ORACLE_CONNECT_STRING;

module.exports = {
    user: oracleUser,
    password: oraclePassword,
    connectString: connectString, // Oracle DB 접속 문자열
  };
  