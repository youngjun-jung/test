# 1. Node.js 22.13.0 이미지 사용
FROM node:22.13.0-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사 후 의존성 설치
COPY package*.json ./
RUN npm install

# 프로젝트 파일 복사
COPY . .

# Vue.js 애플리케이션 빌드
RUN npm run build

# http-server 설치 (정적 파일 제공)
RUN npm install -g http-server

# 컨테이너의 8081 포트 노출
EXPOSE 8081

# http-server를 dist 폴더에서 실행
CMD ["http-server", "dist"]
