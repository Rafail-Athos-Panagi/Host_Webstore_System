const express = require("express");
const app = express.Router();
const con = require("../mysql");


app.post("/getinfo", function (req, res) {
    try {
        if (req.cookies.userID == null)
            return;

        const userID = req.cookies.userID;
        const sql = `SELECT firstName, lastName FROM customers WHERE userID = ?`;
        con.query(sql, [userID], function (err, result) {
            if (err !== null) {
                console.log(err);
            } else
                res.json(result);
        });

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});


app.post("/updateinfo", function (req, res) {
    try {
        if (req.cookies.userID == null)
            return;

        const userID = req.cookies.userID;
        const sql = `UPDATE customers SET firstName=?,lastName=? WHERE userID=?`;
        con.query(sql, [req.body.firstName, req.body.lastName, userID], function (err, result) {
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


app.post("/updateaccount", function (req, res) {
    try {
        if (req.cookies.userID == null)
            return;
        
        const userID = req.cookies.userID;

        con.query(`SELECT email FROM users WHERE userID = ? AND password=SHA2(?,0)`, [userID, req.body.oldpassword], function (err, result) {
            if (err !== null)
                console.log(err);
            else {
                if (result.length === 0) {
                    res.status(401).send();
                    return; 
                } else {
                    const sql = `UPDATE users SET password=SHA2(?,0) WHERE userID=?`;
                    con.query(sql, [req.body.password, userID], function (err, result) {
                        if (err !== null)
                            console.log(err);
                        else
                            res.json(result.insertId).send();
                    });
                }
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

app.post("/updateaddress", function (req, res) {
    try {
        if (req.cookies.userID == null)
            return;
        
        const userID = req.cookies.userID;

        const sql = "UPDATE address SET streetName = ?, houseNumber = ?, city = ?, area = ?, postalCode = ?, phoneNumber = ?, buildingName = ?, flatNumber = ?, specialInstructions = ? WHERE userID = ?";

        con.query(sql, [req.body.streetName, req.body.houseNumber, req.body.city, req.body.area, req.body.postalCode, req.body.phoneNumber, req.body.buildingName, req.body.flatNumber, req.body.specialInstructions, userID], function (err, result) {
            if (err !== null){
                console.log(err);
                throw err;
            } else
                res.status(200).send();
        });

    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});



app.post("/history", function (req, res) {
    try {
        if (req.cookies.userID == null)
            return;

        const userID = req.cookies.userID;
        const sql = `SELECT orderID,orderPrice,orderDate FROM orders WHERE userID = ?`;
        con.query(sql, [userID], function (err, result) {
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


app.post("/historydetails", function (req, res) {
    try {
        if (req.cookies.userID == null)
            return;

        const userID = req.cookies.userID;
        const sql = `SELECT orderID,itemID,itemPrice,quantity FROM orderdetails NATURAL JOIN orders WHERE userID = ?`;
        con.query(sql, [userID], function (err, result) {
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

app.post("/historyextras", function (req, res) {
    try {
        if (req.cookies.userID == null)
            return;

        const userID = req.cookies.userID;
        const sql = `SELECT orderID,itemID,extraItemName,extraItemPrice,orderedQuantity FROM extraItemsOrderDetails NATURAL JOIN orders WHERE userID = ?`;
        con.query(sql, [userID], function (err, result) {
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

app.post("/getpending", function (req, res) {
    try {
        if (req.cookies.userID == null)
            return;

        const userID = req.cookies.userID;
        const sql = `SELECT * FROM orders WHERE userID = ? and orderStatus != "ready" AND orderStatus != "cancelled" and orderStatus != "delivered"`;
        con.query(sql, [userID], function (err, result) {
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

app.post("/getaddress", function (req, res) {
    try {
        if (req.cookies.userID == null)
            return;

        const userID = req.cookies.userID;
        const sql = `SELECT * FROM address WHERE userID = ?`;
        con.query(sql, [userID], function (err, result) {
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