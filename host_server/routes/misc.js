const express = require("express");
const app = express.Router();
const con = require("../mysql");

app.post("/sendmessage", function (req, res) {
    try {
        request = req.body;
        sql = "INSERT INTO customerMessages (email, reason, message) VALUES (?,?,?)";
        con.execute(sql, [request.email, request.reason, request.message], function (err) {
            if (err) {
                console.log(err);
                res.status(503).send();
                return;
            }
            res.status(200).send();
        });

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

module.exports = app;