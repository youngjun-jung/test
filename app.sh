#!/bin/bash

APP_NAME="app.js" # Node.js 애플리케이션 파일 이름
LOG_FILE="app.log" # 로그 파일 이름

start_app() {
  echo "Starting $APP_NAME..."
  nohup node $APP_NAME > $LOG_FILE 2>&1 & # 백그라운드에서 실행
  echo "$APP_NAME started with PID $!"
}

stop_app() {
  echo "Stopping $APP_NAME..."
  PID=$(ps -ef | grep $APP_NAME | grep -v grep | awk '{print $2}') # 프로세스 ID 가져오기
  if [ -z "$PID" ]; then
    echo "$APP_NAME is not running."
  else
    kill -9 $PID
    echo "$APP_NAME stopped."
  fi
}

status_app() {
  PID=$(ps -ef | grep $APP_NAME | grep -v grep | awk '{print $2}')
  if [ -z "$PID" ]; then
    echo "$APP_NAME is not running."
  else
    echo "$APP_NAME is running with PID $PID."
  fi
}

case "$1" in
  start)
    start_app
    ;;
  stop)
    stop_app
    ;;
  status)
    status_app
    ;;
  restart)
    stop_app
    start_app
    ;;
  *)
    echo "Usage: $0 {start|stop|status|restart}"
    exit 1
esac

exit 0
