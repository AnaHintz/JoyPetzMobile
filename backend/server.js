var cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();


//parser para requisições content-type:
//application/x-www-form-urlencoded-json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  app.use(cors());
  next();
 });


app.get("/", (req, res) => {
  res.json({
    message: "API JPM funcionando",
  });
});

app.listen(3077, () => {
  console.log("Servidor rodando na porta 3077");
});