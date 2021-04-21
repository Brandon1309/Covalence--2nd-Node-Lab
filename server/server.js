const express = require("express")
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

//Middleware logger:(has to be up here)
app.use((req, res, next) => {
  console.log(req.url)
  next();
})

app.use(express.static("public"));

app.use(express.urlencoded({
  extended: false
}))

app.get("/", (req, res) => {
  res.send("hello from the server side")
})

app.post("/form-submission", (req, res) => {

  let obj = {
    table: []
  }
  obj.table.push(`{"name" : "${req.body.name}", "country": "${req.body.country}"}`)
  var json = JSON.stringify(obj);
  fs.writeFile("name-cont.json", json, "utf8", () => {
    console.log("hello")
  })
  console.log(req.body.name);
  console.log(req.body.country);

  res.send("thanks for submitting!")
})

app.listen(3000, () => {
  console.log("server up on port 3000")
})