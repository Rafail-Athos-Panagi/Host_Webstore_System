const express = require("express");
const app = express.Router();
const con = require("../mysql");

app.post("/new", function (req, res) {
    try {
        //Check if restaurant is open
        con.query('SELECT open FROM restaurant', function (err, result) {
            if (err !== null)
                console.log(err);
            else {
                if (result[0].open === 0) {
                    res.status(400).send();
                    return;
                }
            }
        });

        let userID = req.body.userID;
        if (req.cookies.userID != null)
            userID = req.cookies.userID;

        const sql = `INSERT INTO orders(userID,orderStatus,orderPrice,orderDate,orderTimeOfStatus,orderFirstTime) VALUES (?, ?, ?, ?, DEFAULT, DEFAULT)`;
        con.query(sql, [userID, req.body.orderStatus, req.body.orderPrice, req.body.orderDate], function (err, result) {
            if (err !== null)
                console.log(err);
            else
                res.json(result.insertId);
        });

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

app.post("/newdetails", function (req, res) {
    try {
        //Check if restaurant is open
        con.query('SELECT open FROM restaurant', function (err, result) {
            if (err !== null)
                console.log(err);
            else {
                if (result[0].open === 0) {
                    res.status(400).send();
                    return;
                }
            }
        });

        let userID = req.body.userID;
        if (req.cookies.userID != null)
            userID = req.cookies.userID;

        const values = req.body.values;
        const sql = `INSERT INTO orderdetails(orderID,itemID,itemPrice,quantity, comment) VALUES (?, ?, ?, ?, ?)`;

        values.forEach((value) => {
            con.query(sql, [value[0], value[1], value[2], value[3], value[4]], function (err, result) {
                if (err !== null) {
                    console.log(err);
                    res.json(err);
                }
            });
        });
        res.status(200).json({insertID: values[0][0]});
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

app.post("/newextras", function (req, res) {
    try{
        //Check if restaurant is open
        con.query('SELECT open FROM restaurant', function (err, result) {
            if (err !== null)
                console.log(err);
            else {
                if (result[0].open === 0) {
                    res.status(400).send();
                    return;
                }
            }
        });

        let userID = req.body.userID;
        if (req.cookies.userID != null)
            userID = req.cookies.userID;

        const values = req.body.values;
        const sql = `INSERT INTO extraItemsOrderDetails VALUES (?, ?, ?, ?, ?, ?)`;

        values.forEach((value) => {
            con.query(sql, [value[0], value[1], value[2], value[3], value[4], value[5]], function (err, result) {
                if (err !== null) {
                    console.log(err);
                    res.json(err);
                }
            });
        });
        res.status(200).json({insertID: values[0][0]});
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }

});

app.post("/getids", function (req, res) {
    try {
        let userID = req.body.userID;
        if (req.cookies.userID != null)
            userID = req.cookies.userID;

        const sql = "SELECT orderedItemID FROM orderdetails WHERE orderID = ?";
        con.query(sql, [req.body.orderID], function (err, result) {
            if (err !== null)
                console.log(err);
            else
                res.json(result);
        });

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }

});

app.post("/status", function (req, res) {
    try {
        let userID = req.body.userID;
        if (req.cookies.userID != null)
            userID = req.cookies.userID;

        const sql = `SELECT orderStatus FROM orders WHERE orderID = ?`;
        con.query(sql, [req.body.orderID], function (err, result) {
            if (err !== null)
                console.log(err);
            else
                res.json(result);
        });

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

module.exports = app;