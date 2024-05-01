var express = require("express");
var router = express.Router();
const fs = require("fs");

/* GET home page. */

router.get("/", (req, res) => {
  res.render("root");
});

router.post("/startChat", (req, res) => {
  let username = req.body.username;
  req.session.username = username;
  res.redirect("/chat");
});

router.get("/chat", function (req, res, next) {
  const username = req.session.username;
  fs.readFile("messages.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.render("error");
    } else {
      let pastMsgs = data.split("\n"); // Splitting data into an array of lines
      res.render("Chat", { pastMsgs: pastMsgs, username: username });
    }
  });
});

module.exports = router;
