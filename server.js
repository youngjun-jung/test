const express = require('express');
const app = require('./app');
const logger = require('./logger'); 

const PORT = process.env.PORT || 3000;

var figlet = require("figlet");

figlet("Hello YoungPoong!!", function (err, data) {
  if (err) {
    logger.info("Something went wrong...");
    console.dir(err);
    return;
  }
  logger.info(data);
});

// 서버 실행
app.listen(PORT, () => {
  logger.info(`Server is running on port:${PORT}`);
});
