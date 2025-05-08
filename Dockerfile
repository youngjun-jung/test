# 1. Node.js 베이스 이미지 사용
FROM node:19-alpine

# 2. 작업 디렉토리 생성
WORKDIR /home/node

# 3. 의존성 설치를 위해 package.json, package-lock.json 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install --silent

# 5. 전체 소스 복사
COPY . .

# 6. 컨테이너 실행 시 명령어 지정
CMD ["npm", "run", "start"]

# 7. 컨테이너에서 사용할 포트 오픈
EXPOSE 3000
