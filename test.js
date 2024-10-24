// const fs = require("fs");

// fs.appendFile("text.txt", "HELLO", (error) => {
//   if (error) console.log(err);
//   console.log("DONE");
// });

// fs.readFile("text.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data);
// });

// const filePath = "/Users/24HP6298/Desktop/backend/text.txt";
// // node test.js

// fs.unlink(filePath, (err) => {
//   if (err) {
//     console.error(`${err}`);
//     return;
//   }

//   console.log(`removed`);
// });

const http = require("http");
const fs = require("fs");
const service = http.createServer((req, res) => {
  console.log(req.url);
  const url = req.url;

  if (url === "/users") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    fs.readFile("index.html", "utf-8", (err, data) => {
      res.write(data);
      res.end();
    });
    console.log("hi");
  } else {
    res.statusCode = 404;
    res.end();
  }
});
service.listen(8080, console.log("success"));
