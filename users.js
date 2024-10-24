const usersData = [
  { age: 13, name: "Taivan", school: "Oros_3", id: "1" },
  { age: 13, name: "Tuvshin", school: "Oros_3", id: "2" },
  { age: 13, name: "Tuugii", school: "Oros_3", id: "3" },
];

const { countReset } = require("console");
// const service = http.createServer((req, res) => {
//   const url = req.url;

//   res.setHeader("Content-Type", "application/Json");
//   if (url.startsWith("/users")) {
//     res.statusCode = 200;
//     res.write(JSON.stringify(usersData));
//     res.end();
//   } else {
//     res.statusCode = 200;
//     res.write(JSON.stringify({ Error: "no such website" }));
//     res.end();
//   }
// });
// service.listen(8090, console.log("success"));

// const http = require("http");

// const service = http.createServer((req, res) => {
//   const url = req.url;
//   res.setHeader("Content-Type", "application/Json");
//   if (url.startsWith("/users?id=")) {
//     res.statusCode = 200;
//     const UserId = url.split("=")[1];

//     const users = usersData.find((hereglegch) => {
//       return hereglegch.id === UserId;
//     });
//     if (users) {
//       res.write(JSON.stringify(users));
//     } else {
//       res.write(JSON.stringify({ Error: "no message found" }));
//     }

//     res.end();
//   } else {
//     res.statusCode = 200;
//     res.write(JSON.stringify(usersData));
//     console.log("hi");
//     res.end();
//   }
// });
// service.listen(8090, console.log("success"));
const http = require("http");
const url = require("url");

const service = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  res.setHeader("Content-Type", "application/Json");
  if (q.pathname === "/users") {
    res.statusCode = 200;
    const qData = q.query;
    const UserKey = Object.keys(qData)[0];
    console.log(typeof UserKey);
    const UserValue = qData[UserKey];
    console.log(UserKey);
    console.log(qData.UserKey);
    const users = usersData.find((hereglegch) => {
      return hereglegch.UserKey === UserKey;
    });
    if (users) {
      res.write(JSON.stringify(users));
    } else {
      res.write(JSON.stringify({ Error: "no message found" }));
    }

    res.end();
  } else {
    res.statusCode = 200;
    res.write(JSON.stringify({ Error: "no such website" }));
    res.end();
  }
});
service.listen(8090, console.log("success"));
