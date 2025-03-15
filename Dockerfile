# 1. Node.js 22.13.0 이미지 사용
FROM node:22.13.0-alpine

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json 및 package-lock.json 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. 애플리케이션 소스 복사
COPY . .

# 6. 포트 노출
EXPOSE 3000

# 7. 환경 변수 설정
ENV NODE_ENV production

# 8. 시작 명령어 설정
CMD ["node", "server.js"]
