const express = require("express");
const app = express.Router();
const con = require("../mysql");

app.get("/get", function (req, res) {
    const sql = `select * from menuitems`;
    con.query(sql, function (err, result) {
      if (err !== null) {
        console.log(err);
      } else
        res.json(result);
    });
  })
  
  
  app.get("/getextraitems", function (req, res) {
    const sql = `select * from menuExtraItems`;
    con.query(sql, function (err, result) {
      if (err !== null) {
        console.log(err);
      } else
        res.json(result);
    });
  });
  
  
  app.get("/getrepeatdays", function (req, res) {
    const sql = `select * from menuRepeatDays`;
    con.query(sql, function (err, result) {
      if (err !== null) {
        console.log(err);
      } else
        res.json(result);
    });
  });

  app.get("/isopen", function (req, res) {
    const sql = `select open from restaurant`;
    con.query(sql, function (err, result) {
      if (err !== null) {
        console.log(err);
      } else
        res.json(result[0]);
    });
  });


module.exports = app;