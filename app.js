var figlet = require("figlet");

figlet("Hello Wor213123123ld!!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});
