const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const initiateMongoDBServer = require("./auth");
initiateMongoDBServer();

const hello_routes = require("./routes/routeT")

const app = express();
//app.use(express.static(path.join(__dirname, "..", "front/public")));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "front", "index.html"));
  }
);

app.use(bodyParser.json());

app.use("/user", userRouter);
//app.use("/hello", hello_routes);

const port = process.env.PORT || 8080;
app.listen(port);
console.log("App is listening on port" + port);

