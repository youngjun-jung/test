const express = require('express');
const logger = require('./logger'); 
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const SwaggerParser = require('swagger-parser');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const loginRoutes = require('./src/routes/login.routes');
const updateRoutes = require('./src/routes/update.routes');
const menuRoutes = require('./src/routes/menu.routes');
const userRoutes = require('./src/routes/user.routes');
const groupRoutes = require('./src/routes/group.routes');
const fileRoutes = require('./src/routes/file.routes');
const saleRoutes = require('./src/routes/sale.routes');
const saleledgerRoutes = require('./src/routes/saleledger.routes');
const cogmRoutes = require('./src/routes/cogm.routes');
const errorRoutes = require('./src/routes/error.routes');
const exchangeRoutes = require('./src/routes/exchange.routes');
const lmeRoutes = require('./src/routes/lme.routes');
const tcRoutes = require('./src/routes/tc.routes');
const plugRoutes = require('./src/routes/plug.routes');
const ref1Routes = require('./src/routes/ref1.routes');
const ref2Routes = require('./src/routes/ref2.routes');
const refindicatorRoutes = require('./src/routes/refindicator.routes');
const otherexpensesRoutes = require('./src/routes/otherexpenses.routes');
const otherexpensestRoutes = require('./src/routes/otherexpensest.routes');
const submaterialRoutes = require('./src/routes/submaterial.routes');
const submaterialtRoutes = require('./src/routes/submaterialt.routes');
const laborcostRoutes = require('./src/routes/laborcost.routes');
const laborcosttRoutes = require('./src/routes/laborcostt.routes');
const repairexpensesRoutes = require('./src/routes/repairexpenses.routes');
const repairexpensestRoutes = require('./src/routes/repairexpensest.routes');
const eleccostRoutes = require('./src/routes/eleccost.routes');
const eleccosttRoutes = require('./src/routes/eleccostt.routes');
const depreciationRoutes = require('./src/routes/depreciation.routes');
const depreciationtRoutes = require('./src/routes/depreciationt.routes');
const zincconcentrateRoutes = require('./src/routes/zincconcentrate.routes');
const agbyproductsRoutes = require('./src/routes/agbyproducts.routes');
const selfconsumptionRoutes = require('./src/routes/selfconsumption.routes');
const zincconcentratemanualRoutes = require('./src/routes/zincconcentratemanual.routes');
const zincconcentrateunitcostRoutes = require('./src/routes/zincconcentrateunitcost.routes');
const zincautoRoutes = require('./src/routes/zincauto.routes');
const productsRoutes = require('./src/routes/products.routes');
const distributiontableRoutes = require('./src/routes/distributiontable.routes');
const submaterialaiaRoutes = require('./src/routes/submaterialaia.routes');
const laborcostaiaRoutes = require('./src/routes/laborcostaia.routes');
const eleccostaiaRoutes = require('./src/routes/eleccostaia.routes');
const otherexpensesaiaRoutes = require('./src/routes/otherexpensesaia.routes');
const products_dtlRoutes = require('./src/routes/products_dtl.routes');
const repairexpensesaiaRoutes = require('./src/routes/repairexpensesaia.routes');
const depreciationaiaRoutes = require('./src/routes/depreciationaia.routes');
const zincconcplanRoutes = require('./src/routes/zincconcplan.routes');
const productioninputsRoutes = require('./src/routes/productioninputs.routes');

const app = express();

// 미들웨어 설정
app.use(bodyParser.json());
    // Swagger(Autogen) 
    //app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // 메인 Swagger 파일의 경로 설정
    const swaggerFilePath = path.join(__dirname, 'docs', 'mainSwagger.yaml');
    // YAML 파일 로드 및 파싱
    //const swaggerDocument = yaml.load(fs.readFileSync('./docs/mainSwagger.yaml', 'utf8'));
    // swagger.yaml 파일의 외부 $ref를 모두 병합한 후 사용
    SwaggerParser.bundle(swaggerFilePath)
        .then(apiSpec => {
            // Swagger UI 설정 및 제공 경로 지정 (/api-docs)
            app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

        });


// 라우트 설정
    // 시스템
app.use('/api/login', loginRoutes); // 로그인 API 경로
app.use('/api/update', updateRoutes); // 파일 업데이트 API 경로
app.use('/api/menu', menuRoutes); // 메뉴 API 경로
app.use('/api/user', userRoutes); // 사용자 정보 경로
app.use('/api/group', groupRoutes); // 그룹 정보 경로
app.use('/api/file', fileRoutes); // 소스 파일 정보 경로
app.use('/api/error', errorRoutes); // 시스템 오류 정보 경로

    // 실적 자료
app.use('/api/sale', saleRoutes); // 판매량 정보 경로
app.use('/api/saleledger', saleledgerRoutes); // 판매 내역 정보 경로
app.use('/api/cogm', cogmRoutes); // 제조원가 정보 경로

    // 기초자료
app.use('/api/exchange', exchangeRoutes); // 환율 정보 경로
app.use('/api/lme', lmeRoutes); // LME 정보 경로
app.use('/api/tc', tcRoutes); // TC 정보 경로

    // 생산원가 계획
app.use('/api/plug', plugRoutes); // plug 정보 경로

    // 제조원가 계획
app.use('/api/ref1', ref1Routes); // 참조1 정보 경로
app.use('/api/ref2', ref2Routes); // 참조2 정보 경로
app.use('/api/refindicator', refindicatorRoutes); // 기준지표 정보 경로
app.use('/api/otherexpenses', otherexpensesRoutes); // 월별 기타경비 정보 경로
app.use('/api/otherexpensest', otherexpensestRoutes); // 종합 기타경비 정보 경로
app.use('/api/submaterial', submaterialRoutes); // 월별 보조재료 정보 경로
app.use('/api/submaterialt', submaterialtRoutes); // 종합 보조재료 정보 경로
app.use('/api/laborcost', laborcostRoutes); // 월별 노무비 정보 경로
app.use('/api/laborcostt', laborcosttRoutes); // 종합 노무비 정보 경로
app.use('/api/repairexpenses', repairexpensesRoutes); // 월별 수선비 정보 경로
app.use('/api/repairexpensest', repairexpensestRoutes); // 종합 수선비 정보 경로
app.use('/api/eleccost', eleccostRoutes); // 월별 전력비 정보 경로
app.use('/api/eleccostt', eleccosttRoutes); // 종합 전력비 정보 경로
app.use('/api/depreciation', depreciationRoutes); // 월별 감가상각비 정보 경로
app.use('/api/depreciationt', depreciationtRoutes); // 종합 감가상각비 정보 경로
app.use('/api/zincconcentrate', zincconcentrateRoutes); // 월별 아연 정광 구매 계획(원료) 정보 경로
app.use('/api/agbyproducts', agbyproductsRoutes); // 월별 은부산물 정보 경로
app.use('/api/selfconsumption', selfconsumptionRoutes); // 월별 자가소비 정보 경로
app.use('/api/zincconcentratemanual', zincconcentratemanualRoutes); // 고품위 아연정광 정보 경로
app.use('/api/zincconcentrateunitcost', zincconcentrateunitcostRoutes); // 월별 아연정광 단가 정보 경로
app.use('/api/zincauto', zincautoRoutes); // 월별 정광 정보 경로
app.use('/api/zincconcplan', zincconcplanRoutes); // 월별 정광수불(계획) 정보 경로
app.use('/api/productioninputs', productioninputsRoutes); // 월별 생산, 부원료 정보 경로

    // 계획종합
app.use('/api/products', productsRoutes); // 월별 계획종합 정보 경로
app.use('/api/products_dtl', products_dtlRoutes); // 월별 계획종합(상세) 정보 경로

    // 간접부문 배부후
app.use('/api/distributiontable', distributiontableRoutes); // 배부표 정보 경로
app.use('/api/submaterialaia', submaterialaiaRoutes); // (간접부문 배부후) 보조재료비 정보 경로
app.use('/api/laborcostaia', laborcostaiaRoutes); // (간접부문 배부후) 노무비 정보 경로
app.use('/api/eleccostaia', eleccostaiaRoutes); // (간접부문 배부후) 전력비 정보 경로
app.use('/api/otherexpensesaia', otherexpensesaiaRoutes); // (간접부문 배부후) 기타경비 정보 경로
app.use('/api/repairexpensesaia', repairexpensesaiaRoutes); // (간접부문 배부후) 수선비 정보 경로
app.use('/api/depreciationaia', depreciationaiaRoutes); // (간접부문 배부후) 감가상각비 정보 경로

module.exports = app;