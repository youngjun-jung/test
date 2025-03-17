require('dotenv').config();

// 자동생성 모듈
const swaggerAutogen = require("swagger-autogen")({ openapi: '3.0.0'});
// 자동으로 생성될 Swagger 파일
const outputFile = "./swagger-output.json";
// 엔드포인트가 정의된 js -> router를 쓰는 경우에는 최상위로 지정해야함 하위는 자동 검색됨됨
const endpointsFile = ['./app.js'];
// 데이터 컴포넌트를 정의해 둔 파일
const swaggerSchemas = require("./src/config/swaggerComponents.js");

// API 문서의 기본 정보
const options = {
      openapi: '3.0.0', // OpenAPI 버전 지정
      info: {
        title: 'YP Project API Documentation',
        version: '1.0.0',
        description: '‘사업 계획’ 및 ‘원가 분석’ 프로젝트에서 개발된 API 명세입니다\nAPI Key가 있어야 사용이 가능하며, 관리자에게 문의하세요.',
      },
      servers: [
        {
          url: 'localhost:' + process.env.PORT, // 서버 호스트
        }
      ],
      securityDefinitions: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "API Key를 요청 헤더에 포함해야 합니다.",
        },
      },
      components: {
        schemas: swaggerSchemas,
      }
    };
    

swaggerAutogen(outputFile, endpointsFile, options);