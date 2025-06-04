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
const updateFileListRoutes = require('./src/routes/updatefilelist.routes');
const currentVersionRoutes = require('./src/routes/currentversion.routes');

const exchangeRoutes = require('./src/routes/exchange.routes');
const lmeRoutes = require('./src/routes/lme.routes');
const tcRoutes = require('./src/routes/tc.routes');
const plugRoutes = require('./src/routes/plug.routes');
const ref1Routes = require('./src/routes/ref1.routes');
const ref2Routes = require('./src/routes/ref2.routes');
const refindicatorRoutes = require('./src/routes/refindicator.routes');
const backrefindicatorRoutes = require('./src/routes/backrefindicator.routes');
const refindicatorprocRoutes = require('./src/routes/refindicatorproc.routes');
const otherexpensesRoutes = require('./src/routes/otherexpenses.routes');
const backotherexpensesRoutes = require('./src/routes/backotherexpenses.routes');
const otherexpensestRoutes = require('./src/routes/otherexpensest.routes');
const submaterialRoutes = require('./src/routes/submaterial.routes');
const backsubmaterialRoutes = require('./src/routes/backsubmaterial.routes');
const submaterialtRoutes = require('./src/routes/submaterialt.routes');
const laborcostRoutes = require('./src/routes/laborcost.routes');
const backlaborcostRoutes = require('./src/routes/backlaborcost.routes');
const laborcosttRoutes = require('./src/routes/laborcostt.routes');
const repairexpensesRoutes = require('./src/routes/repairexpenses.routes');
const backrepairexpensesRoutes = require('./src/routes/backrepairexpenses.routes');
const repairexpensestRoutes = require('./src/routes/repairexpensest.routes');
const eleccostRoutes = require('./src/routes/eleccost.routes');
const eleccosttRoutes = require('./src/routes/eleccostt.routes');
const backeleccostRoutes = require('./src/routes/backeleccost.routes');
const backeleccosttRoutes = require('./src/routes/backeleccostt.routes');
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
const preciousmetalsRoutes = require('./src/routes/preciousmetals.routes');
const productszincRoutes = require('./src/routes/productszinc.routes');
const productszincdustRoutes = require('./src/routes/productszincdust.routes');
const productscadmiumRoutes = require('./src/routes/productscadmium.routes');
const productscoppersulfateRoutes = require('./src/routes/productscoppersulfate.routes');
const productssulfuricacidRoutes = require('./src/routes/productssulfuricacid.routes');
const productselcopperRoutes = require('./src/routes/productselcopper.routes');
const productsplasterRoutes = require('./src/routes/productsplaster.routes');
const productsgoldRoutes = require('./src/routes/productsgold.routes');
const productssilverRoutes = require('./src/routes/productssilver.routes');
const productstotalRoutes = require('./src/routes/productstotal.routes');
const monthlyproductcostRoutes = require('./src/routes/monthlyproductcost.routes');

const productsmonthszincRoutes = require('./src/routes/productsmonthzinc.routes');
const productsmonthzincdustRoutes = require('./src/routes/productsmonthzincdust.routes');
const productsmonthcadmiumRoutes = require('./src/routes/productsmonthcadmium.routes');
const productsmonthcoppersulfateRoutes = require('./src/routes/productsmonthcoppersulfate.routes');
const productsmonthsulfuricacidRoutes = require('./src/routes/productsmonthsulfuricacid.routes');
const productsmonthelcopperRoutes = require('./src/routes/productsmonthelcopper.routes');
const productsmonthplasterRoutes = require('./src/routes/productsmonthplaster.routes');
const productsmonthgoldRoutes = require('./src/routes/productsmonthgold.routes');
const productsmonthsilverRoutes = require('./src/routes/productsmonthsilver.routes');
const productsmonthtotalRoutes = require('./src/routes/productsmonthtotal.routes');

const plestimationRoutes = require('./src/routes/plestimation.routes');

const backupRoutes = require('./src/routes/backup.routes');
const backupdeleteRoutes = require('./src/routes/backupdelete.routes');
const backuprecRoutes = require('./src/routes/backuprec.routes');
const backuplistRoutes = require('./src/routes/backuplist.routes');

const procRoutes = require('./src/routes/proc.routes');
const basicdataRoutes = require('./src/routes/basicdata.routes');

    // 기획팀
const plansalesRoutes = require('./src/routes/plansales.routes');
const backplansalesRoutes = require('./src/routes/backplansales.routes');
const planrefindicatorRoutes = require('./src/routes/planrefindicator.routes');
const plansellingexpensesRoutes = require('./src/routes/plansellingexpenses.routes');
const backplansellingexpensesRoutes = require('./src/routes/backplansellingexpenses.routes');
const plangeneraladministrativeRoutes = require('./src/routes/plangeneraladministrative.routes');
const plansellingexpensesdtlRoutes = require('./src/routes/plansellingexpensesdtl.routes');
const backplansellingexpensesdtlRoutes = require('./src/routes/backplansellingexpensesdtl.routes');
const planbyproductRoutes = require('./src/routes/planbyproduct.routes');
const planmonthlyinventoryRoutes = require('./src/routes/planmonthlyinventory.routes');
const backplanmonthlyinventoryRoutes = require('./src/routes/backplanmonthlyinventory.routes');
const planmonthlyinventorydtlRoutes = require('./src/routes/planmonthlyinventorydtl.routes');
const backplanmonthlyinventorydtlRoutes = require('./src/routes/backplanmonthlyinventorydtl.routes');
const plancostofgoodsRoutes = require('./src/routes/plancostofgoods.routes');
const backplancostofgoodsRoutes = require('./src/routes/backplancostofgoods.routes');

const planbackupRoutes = require('./src/routes/planbackup.routes');
const planbackupdeleteRoutes = require('./src/routes/planbackupdelete.routes');
const planbackuprecRoutes = require('./src/routes/planbackuprec.routes');
const planbackuplistRoutes = require('./src/routes/planbackuplist.routes');
const planprocRoutes = require('./src/routes/planproc.routes');
const planbasicdataRoutes = require('./src/routes/planbasicdata.routes');

    // 전력료
const elecdivisioncostRoutes = require('./src/routes/elecdivisioncost.routes');
const elecrectifierRoutes = require('./src/routes/elecrectifier.routes');
const elecrectifierplanRoutes = require('./src/routes/elecrectifierplan.routes');
const elecdivisionfinalRoutes = require('./src/routes/elecdivisionfinal.routes');
const elecrectifiermnRoutes = require('./src/routes/elecrectifiermn.routes');
const elecrectifiercostRoutes = require('./src/routes/elecrectifiercost.routes');
const elecrectifierwoncostRoutes = require('./src/routes/elecrectifierwoncost.routes');

    // 계획비교(삭제예정)
const comparePlaRoutes = require('./src/routes/comparePlan.routes');

   // 최종
const plantotalfinalRoutes = require('./src/routes/plantotalfinal.routes');  
const backupplantotalfinalRoutes = require('./src/routes/backupplantotalfinal.routes'); 
const plancasetotalfinalRoutes = require('./src/routes/plancasetotalfinal.routes');  
const backupplancasetotalfinalRoutes = require('./src/routes/backupplancasetotalfinal.routes');  
const yearbackupRoutes = require('./src/routes/yearbackup.routes'); 

   // 신규
const plannewtotalfinalRoutes = require('./src/routes/plannewtotalfinal.routes');  
const planlaborzincRoutes = require('./src/routes/planlaborzinc.routes'); 
const planlossRoutes = require('./src/routes/planloss.routes');
const plansalecntRoutes = require('./src/routes/plansalecnt.routes');
const procnewRoutes = require('./src/routes/procnew.routes');
const procnew1Routes = require('./src/routes/procnew1.routes');
const procnew2Routes = require('./src/routes/procnew2.routes');

    // 시물레이션
const simulplannewtotalfinalRoutes = require('./src/routes/simulplannewtotalfinal.routes');   
const simulprocnew1Routes = require('./src/routes/simulprocnew1.routes');
const simulprocnew2Routes = require('./src/routes/simulprocnew2.routes');  

// ========= Backup target =========
const backplugRoutes = require('./src/routes/backplug.routes');
const backotherexpensestRoutes = require('./src/routes/backotherexpensest.routes');
const backsubmaterialtRoutes = require('./src/routes/backsubmaterialt.routes');
const backlaborcosttRoutes = require('./src/routes/backlaborcostt.routes');
const backrepairexpensestRoutes = require('./src/routes/backrepairexpensest.routes');
const backdepreciationRoutes = require('./src/routes/backdepreciation.routes');
const backdepreciationtRoutes = require('./src/routes/backdepreciationt.routes');
const backzincconcentrateRoutes = require('./src/routes/backzincconcentrate.routes');
//const backrefindicatorRoutes = require('./src/routes/refindicator.routes');
//const backplansalesRoutes = require('./src/routes/plansales.routes');

const backref1Routes = require('./src/routes/backref1.routes');
const backref2Routes = require('./src/routes/backref2.routes');
const backproducts_dtlRoutes = require('./src/routes/backproducts_dtl.routes');
const backagbyproductsRoutes = require('./src/routes/backagbyproducts.routes');
const backselfconsumptionRoutes = require('./src/routes/backselfconsumption.routes');
const backzincautoRoutes = require('./src/routes/backzincauto.routes');
const backzincconcplanRoutes = require('./src/routes/backzincconcplan.routes');
const backproductioninputsRoutes = require('./src/routes/backproductioninputs.routes');
const backpreciousmetalsRoutes = require('./src/routes/backpreciousmetals.routes');
const backmonthlyproductcostRoutes = require('./src/routes/backmonthlyproductcost.routes');
const backelecdivisioncostRoutes = require('./src/routes/backelecdivisioncost.routes');
const backelecdivisionfinalRoutes = require('./src/routes/backelecdivisionfinal.routes');
const backelecrectifierRoutes = require('./src/routes/backelecrectifier.routes');
const backelecrectifierplanRoutes = require('./src/routes/backelecrectifierplan.routes');
// ================================= 

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
            // Swagger UI 설정 및 제공 경로 지정 (/api-docs)1
            app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

        });

// 라우트 설정
    // 시스템
app.use('/api/login', loginRoutes); // 로그인 API 경로
app.use('/api/menu', menuRoutes); // 메뉴 API 경로
app.use('/api/user', userRoutes); // 사용자 정보 경로
app.use('/api/group', groupRoutes); // 그룹 정보 경로
app.use('/api/file', fileRoutes); // 소스 파일 정보 경로
app.use('/api/error', errorRoutes); // 시스템 오류 정보 경로
app.use('/api/program/update/:gubun', updateRoutes); // 파일 업데이트 API 경로
app.use('/api/program/version/current', currentVersionRoutes); // 버전 체크
app.use('/api/program/version/updatelist', updateFileListRoutes); // 업데이트 파일 체크

    // 실적 자료
app.use('/api/sale', saleRoutes); // 판매량 정보 경로
app.use('/api/saleledger', saleledgerRoutes); // 판매 내역 정보 경로
app.use('/api/cogm', cogmRoutes); // 제조원가 정보 경로

    // 기초자료
app.use('/api/exchange', exchangeRoutes); // 환율 정보 경로
app.use('/api/lme', lmeRoutes); // LME 정보 경로
app.use('/api/tc', tcRoutes); // TC 정보 경로

    // 자료 백업
app.use('/api/backup', backupRoutes); // 자료 백업 경로
app.use('/api/backupdelete', backupdeleteRoutes); // 자료 백업 삭제 경로
app.use('/api/backuprec', backuprecRoutes); // 자료 백업 원복 경로
app.use('/api/backuplist', backuplistRoutes); // 백업 List 경로

    // 생산원가 계획
app.use('/api/plug', plugRoutes); // plug 정보 경로

    // 제조원가 계획
app.use('/api/ref1', ref1Routes); // 참조1 정보 경로
app.use('/api/ref2', ref2Routes); // 참조2 정보 경로
app.use('/api/refindicator', refindicatorRoutes); // 기준지표 정보 경로
app.use('/api/backrefindicator', backrefindicatorRoutes); // 기준지표 정보 경로
app.use('/api/refindicatorproc', refindicatorprocRoutes); // 기준지표 수정 경로
app.use('/api/otherexpenses', otherexpensesRoutes); // 월별 기타경비 정보 경로
app.use('/api/backotherexpenses', backotherexpensesRoutes); // 월별 기타경비 정보 경로
app.use('/api/otherexpensest', otherexpensestRoutes); // 종합 기타경비 정보 경로
app.use('/api/submaterial', submaterialRoutes); // 월별 보조재료 정보 경로
app.use('/api/backsubmaterial', backsubmaterialRoutes); // 월별 보조재료 정보 경로
app.use('/api/submaterialt', submaterialtRoutes); // 종합 보조재료 정보 경로
app.use('/api/laborcost', laborcostRoutes); // 월별 노무비 정보 경로
app.use('/api/backlaborcost', backlaborcostRoutes); // 월별 노무비 정보 경로
app.use('/api/laborcostt', laborcosttRoutes); // 종합 노무비 정보 경로
app.use('/api/repairexpenses', repairexpensesRoutes); // 월별 수선비 정보 경로
app.use('/api/backrepairexpenses', backrepairexpensesRoutes); // 월별 수선비 정보 경로
app.use('/api/repairexpensest', repairexpensestRoutes); // 종합 수선비 정보 경로
app.use('/api/eleccost', eleccostRoutes); // 월별 전력비 정보 경로
app.use('/api/eleccostt', eleccosttRoutes); // 종합 전력비 정보 경로
app.use('/api/backeleccost', backeleccostRoutes); // 월별 전력비 정보 경로
app.use('/api/backeleccostt', backeleccosttRoutes); // 종합 전력비 정보 경로
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
app.use('/api/preciousmetals', preciousmetalsRoutes); // 귀금속Conc 정보 경로
app.use('/api/monthlyproductcost', monthlyproductcostRoutes); // 월별 제품별 정보 경로

    // 계획종합
app.use('/api/products', productsRoutes); // 월별 계획종합 정보 경로
app.use('/api/products_dtl', products_dtlRoutes); // 월별 계획종합(상세) 정보 경로

// 계획종합(기타)
app.use('/api/productszinc', productszincRoutes); // 전체 계획종합(아연) 정보 경로
app.use('/api/productszincdust', productszincdustRoutes); // 전체 계획종합(아연말) 정보 경로
app.use('/api/productscadmium', productscadmiumRoutes); // 전체 계획종합(아연말) 정보 경로
app.use('/api/productscoppersulfate', productscoppersulfateRoutes); // 전체 계획종합(황산동) 정보 경로
app.use('/api/productssulfuricacid', productssulfuricacidRoutes); // 전체 계획종합(황산) 정보 경로
app.use('/api/productselcopper', productselcopperRoutes); // 전체 계획종합(전기동) 정보 경로
app.use('/api/productsplaster', productsplasterRoutes); // 전체 계획종합(석고) 정보 경로
app.use('/api/productsgold', productsgoldRoutes); // 전체 계획종합(금) 정보 경로
app.use('/api/productssilver', productssilverRoutes); // 전체 계획종합(은) 정보 경로
app.use('/api/productstotal', productstotalRoutes); // 전체 계획종합(총) 정보 경로

// 계획종합(기타 월별)
app.use('/api/productsmonthzinc', productsmonthszincRoutes); // 월별 계획종합(아연) 정보 경로
app.use('/api/productsmonthzincdust', productsmonthzincdustRoutes); // 월별 계획종합(아연말) 정보 경로
app.use('/api/productsmonthcadmium', productsmonthcadmiumRoutes); // 월별 계획종합(아연말) 정보 경로
app.use('/api/productsmonthcoppersulfate', productsmonthcoppersulfateRoutes); // 월별 계획종합(황산동) 정보 경로
app.use('/api/productsmonthsulfuricacid', productsmonthsulfuricacidRoutes); // 월별 계획종합(황산) 정보 경로
app.use('/api/productsmonthelcopper', productsmonthelcopperRoutes); // 월별 계획종합(전기동) 정보 경로
app.use('/api/productsmonthplaster', productsmonthplasterRoutes); // 월별 계획종합(석고) 정보 경로
app.use('/api/productsmonthgold', productsmonthgoldRoutes); // 월별 계획종합(금) 정보 경로
app.use('/api/productsmonthsilver', productsmonthsilverRoutes); // 월별 계획종합(은) 정보 경로
app.use('/api/productsmonthtotal', productsmonthtotalRoutes); // 월별 계획종합(총) 정보 경로

app.use('/api/plestimation', plestimationRoutes); // 손익추정 정보 경로

    // 간접부문 배부후
app.use('/api/distributiontable', distributiontableRoutes); // 배부표 정보 경로
app.use('/api/submaterialaia', submaterialaiaRoutes); // (간접부문 배부후) 보조재료비 정보 경로
app.use('/api/laborcostaia', laborcostaiaRoutes); // (간접부문 배부후) 노무비 정보 경로
app.use('/api/eleccostaia', eleccostaiaRoutes); // (간접부문 배부후) 전력비 정보 경로
app.use('/api/otherexpensesaia', otherexpensesaiaRoutes); // (간접부문 배부후) 기타경비 정보 경로
app.use('/api/repairexpensesaia', repairexpensesaiaRoutes); // (간접부문 배부후) 수선비 정보 경로
app.use('/api/depreciationaia', depreciationaiaRoutes); // (간접부문 배부후) 감가상각비 정보 경로

    // 시물레이션 처리
app.use('/api/proc', procRoutes); // 전체 처리 경로
app.use('/api/basicdata', basicdataRoutes); // 기초 자료 변경 경로

    // (기획팀)
app.use('/api/plansales', plansalesRoutes); // 월별 매출 계획 경로
app.use('/api/backplansales', backplansalesRoutes); // 월별 매출 계획 경로
app.use('/api/planrefindicator', planrefindicatorRoutes); // 기준지표 정보 경로
app.use('/api/plansellingexpenses', plansellingexpensesRoutes); // 월별 판매비 경로
app.use('/api/backplansellingexpenses', backplansellingexpensesRoutes); // 월별 판매비 경로
app.use('/api/plangeneraladministrative', plangeneraladministrativeRoutes); // 일반관리비 경로
app.use('/api/plansellingexpensesdtl', plansellingexpensesdtlRoutes); // 월별 판매비(상세) 경로
app.use('/api/backplansellingexpensesdtl', backplansellingexpensesdtlRoutes); // 월별 판매비(상세) 경로
app.use('/api/planbyproduct', planbyproductRoutes); // 월별 제품별 경로
app.use('/api/planmonthlyinventory', planmonthlyinventoryRoutes); // 월수불 경로
app.use('/api/backplanmonthlyinventory', backplanmonthlyinventoryRoutes); // 월수불 경로
app.use('/api/planmonthlyinventorydtl', planmonthlyinventorydtlRoutes); // 월수불(상세) 경로
app.use('/api/backplanmonthlyinventorydtl', backplanmonthlyinventorydtlRoutes); // 월수불(상세) 경로
app.use('/api/plancostofgoods', plancostofgoodsRoutes); // 제조원가 경로
app.use('/api/backplancostofgoods', backplancostofgoodsRoutes); // 제조원가 경로

app.use('/api/planproc', planprocRoutes); // 전체 처리 경로
app.use('/api/planbasicdata', planbasicdataRoutes); // 기초 자료 변경 경로
app.use('/api/planbackup', planbackupRoutes); // 자료 백업 경로
app.use('/api/planbackupdelete', planbackupdeleteRoutes); // 자료 백업 삭제 경로
app.use('/api/planbackuprec', planbackuprecRoutes); // 자료 백업 원복 경로
app.use('/api/planbackuplist', planbackuplistRoutes); // 백업 List 경로

   // (전력료)11
app.use('/api/elecdivisioncost', elecdivisioncostRoutes); // 전력료 계산 경로
app.use('/api/elecrectifier', elecrectifierRoutes); // 정류기 계산 경로
app.use('/api/elecrectifierplan', elecrectifierplanRoutes); // 정류기 요금차감 경로
app.use('/api/elecdivisionfinal', elecdivisionfinalRoutes); // 전력료 최종계산 경로
app.use('/api/elecrectifiermn', elecrectifiermnRoutes); // 정류기 최대생산량 경로
app.use('/api/elecrectifiercost', elecrectifiercostRoutes); // 정류기 요금 경로
app.use('/api/elecrectifierwoncost', elecrectifierwoncostRoutes); // 정류기 요금 경로

app.use('/api/compareplan', comparePlaRoutes); // 계획비교

   // 최종
app.use('/api/plantotalfinal', plantotalfinalRoutes); // 최종 월별 자료 계산 경로
app.use('/api/backupplantotalfinal', backupplantotalfinalRoutes); // 최종 월별 백업자료 계산 경로
app.use('/api/plancasetotalfinal', plancasetotalfinalRoutes); // 최종 자료 계산 경로
app.use('/api/backupplancasetotalfinal', backupplancasetotalfinalRoutes); // 최종 백업자료 계산 경로
app.use('/api/yearbackup', yearbackupRoutes); // 월별 기준 백업 자료 경로

   // 신규 최종
app.use('/api/plannewtotalfinal', plannewtotalfinalRoutes); // 최종 계산 경로       
app.use('/api/planlaborzinc', planlaborzincRoutes); // 노무비 조회 경로  
app.use('/api/planloss', planlossRoutes); // 재고 조회 경로
app.use('/api/plansalecnt', plansalecntRoutes); // (실적+계획)판매수량 조회/수정 경로
app.use('/api/plansellingexpensescnt', plansellingexpensescntRoutes); // (실적+계획)월별 판매비 조회/수정 경로
app.use('/api/procnew', procnewRoutes); // 전체 처리 경로
app.use('/api/procnew1', procnew1Routes); // 전체 처리 경로
app.use('/api/procnew2', procnew2Routes); // 전체 처리 경로

   // 시뮬레이션
app.use('/api/simulplannewtotalfinal', simulplannewtotalfinalRoutes); // 최종 계산 경로  
app.use('/api/simulprocnew1', simulprocnew1Routes); // 전체 처리 경로
app.use('/api/simulprocnew2', simulprocnew2Routes); // 전체 처리 경로

// ========= Backup target =========
app.use('/api/backplug', backplugRoutes); // plug 정보 경로
app.use('/api/backotherexpensest', backotherexpensestRoutes); // 종합 기타경비 정보 경로
app.use('/api/backsubmaterialt', backsubmaterialtRoutes); // 종합 보조재료 정보 경로
app.use('/api/backlaborcostt', backlaborcosttRoutes); // 종합 노무비 정보 경로
app.use('/api/backrepairexpensest', backrepairexpensestRoutes); // 종합 수선비 정보 경로
app.use('/api/backdepreciation', backdepreciationRoutes); // 월별 감가상각비 정보 경로
app.use('/api/backdepreciationt', backdepreciationtRoutes); // 종합 감가상각비 정보 경로
app.use('/api/backzincconcentrate', backzincconcentrateRoutes); // 월별 아연 정광 구매 계획(원료) 정보 경로
//app.use('/api/backrefindicator', backrefindicatorRoutes); // 기준지표 정보 경로
//app.use('/api/backplansales', backplansalesRoutes); // 월별 매출 계획 경로

app.use('/api/backref1', backref1Routes); // 참조1 정보 경로
app.use('/api/backref2', backref2Routes); // 참조2 정보 경로
app.use('/api/backproducts_dtl', backproducts_dtlRoutes); // 월별 계획종합(상세) 정보 경로
app.use('/api/backagbyproducts', backagbyproductsRoutes); // 월별 은부산물 정보 경로
app.use('/api/backselfconsumption', backselfconsumptionRoutes); // 월별 자가소비 정보 경로
app.use('/api/backzincauto', backzincautoRoutes); // 월별 정광 정보 경로
app.use('/api/backzincconcplan', backzincconcplanRoutes); // 월별 정광수불(계획) 정보 경로
app.use('/api/backproductioninputs', backproductioninputsRoutes); // 월별 생산, 부원료 정보 경로
app.use('/api/backpreciousmetals', backpreciousmetalsRoutes); // 귀금속Conc 정보 경로
app.use('/api/backmonthlyproductcost', backmonthlyproductcostRoutes); // 월별 제품별 정보 경로
app.use('/api/backelecdivisioncost', backelecdivisioncostRoutes); // 전력료 계산 경로
app.use('/api/backelecdivisionfinal', backelecdivisionfinalRoutes); // 전력료 최종계산 경로
app.use('/api/backelecrectifier', backelecrectifierRoutes); // 정류기 계산 경로
app.use('/api/backelecrectifierplan', backelecrectifierplanRoutes); // 정류기 요금차감 경로
// ================================= 

module.exports = app;