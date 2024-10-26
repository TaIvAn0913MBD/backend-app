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

const http = require("http");
const fs = require("fs");
const JSONDATA = fs.readFileSync("index.json");
let data;
data = JSON.parse(JSONDATA);

const service = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  res.setHeader("Content-Type", "application/Json");
  GetUser(method, req, res, url, data);

  PostUser(method, req, res, data);

  DeleteUser(method, req, res, data);
});
service.listen(8090, console.log("success"));

const PostUser = (method, req, res) => {
  if (method === "POST") {
    let body = "";
    req.on("data", (buff) => {
      body += buff;
    });
    console.log(body);
    req.on("end", () => {
      const praseData = JSON.parse(body);

      const addNewUser = {
        id: data.length + 1,
        ...praseData,
      };

      data.push(addNewUser);

      fs.writeFileSync("index.json", JSON.stringify(data), (err) => {
        console.log(err);
      });
      console.log(praseData);
      res.write(JSON.stringify({ message: "done" }));
      res.end();
    });
  }
};

const DeleteUser = (method, req, res) => {
  if (method === "DELETE") {
    let body = "";
    req.on("data", (buff) => {
      body += buff;
    });
    res.end("end", () => {
      const praseData = JSON.parse(body);
      const removeId = Number(praseData.id);
      console.log(removeId);
      const result = data.filter((item) => {
        return Number(item.id) !== removeId;
      });
      console.log(result);

      fs.writeFileSync("index.json", JSON.stringify(result), (err) => {
        console.log(err);
      });
    });
  }
};

const GetUser = (method, req, res, url) => {
  if (method === "GET") {
    if (url.startsWith("/users?id=")) {
      res.statusCode = 200;
      const UserId = url.split("=")[1];
      const users = data.find((hereglegch) => {
        return hereglegch.id === UserId;
      });

      if (users) {
        res.write(JSON.stringify(users));
      } else {
        res.write(JSON.stringify({ error: "no message found" }));
      }

      res.end();
    } else {
      res.statusCode = 200;
      res.write(JSON.stringify(data));
      res.end();
    }
  }
};

// const http = require("http");
// const url = require("url");
// const fs = require("fs");
// const JSONDATA = fs.readFileSync("index.json");
// let data;
// data = JSON.parse(JSONDATA);

// const service = http.createServer((req, res) => {
//   const q = url.parse(req.url, true);
//   res.setHeader("Content-Type", "application/Json");
//   if (q.pathname === "/users") {
//     res.statusCode = 200;
//     const qData = q.query;
//     const UserKey = Object.keys(qData)[0];
//     const UserValue = qData[UserKey];

//     const users = usersData.find((hereglegch) => {
//       return hereglegch[UserKey] === UserValue;
//     });
//     if (users) {
//       res.write(JSON.stringify(users));
//     } else {
//       res.write(JSON.stringify({ Error: "no message found" }));
//     }

//     res.end();
//   } else {
//     res.statusCode = 200;
//     res.write(JSON.stringify({ Error: "no such website" }));
//     res.end();
//   }
// });
// service.listen(8090, console.log("success"));
